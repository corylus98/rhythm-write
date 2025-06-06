export const SPOTIFY_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID || '31681ccd2ca8426586e38811acd91b36',
  REDIRECT_URI: window.location.origin + '/callback',
  // Full permissions for Premium account - user must confirm they have Premium
  SCOPES: 'streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing'
  
  // Simplified permissions for free account (if you want to switch back to free version):
  // SCOPES: 'user-read-email user-read-private user-read-currently-playing'
};

// PKCE helper functions
export function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  // Convert ArrayBuffer to string using Array.from to avoid spread operator issue
  const hashArray = Array.from(new Uint8Array(digest));
  const base64String = btoa(String.fromCharCode.apply(null, hashArray));
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function buildAuthUrl(): Promise<string> {
  return new Promise(async (resolve) => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);

    // Store for later use
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    localStorage.setItem('spotify_state', state);

    const params = new URLSearchParams({
      client_id: SPOTIFY_CONFIG.CLIENT_ID,
      response_type: 'code',
      redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: state,
      scope: SPOTIFY_CONFIG.SCOPES,
      show_dialog: 'true'
    });

    resolve(`https://accounts.spotify.com/authorize?${params.toString()}`);
  });
}

export async function exchangeCodeForToken(code: string, state: string): Promise<any> {
  console.log('🔄 Starting token exchange...');
  console.log('📋 Received code:', code.substring(0, 10) + '...');
  console.log('📋 Received state:', state);
  
  const storedState = localStorage.getItem('spotify_state');
  const codeVerifier = localStorage.getItem('spotify_code_verifier');

  console.log('📋 Stored state:', storedState);
  console.log('📋 Code verifier exists:', !!codeVerifier);

  if (state !== storedState) {
    console.error('❌ State mismatch!', { received: state, stored: storedState });
    throw new Error('State mismatch - potential CSRF attack');
  }

  if (!codeVerifier) {
    console.error('❌ Code verifier not found in localStorage');
    throw new Error('Code verifier not found');
  }

  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    code_verifier: codeVerifier
  });

  console.log('🔄 Token exchange request params:', {
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    code: code.substring(0, 10) + '...',
    code_verifier: codeVerifier.substring(0, 10) + '...'
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    console.log('📡 Token exchange response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Token exchange failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Parse error response if possible
      try {
        const errorJson = JSON.parse(errorData);
        console.error('❌ Parsed error:', errorJson);
        
        // Handle specific error cases
        if (errorJson.error === 'invalid_grant') {
          if (errorJson.error_description?.includes('authorization code')) {
            throw new Error('Authorization code has expired or was already used. Please try logging in again.');
          } else {
            throw new Error('Invalid authorization grant. Please try logging in again.');
          }
        }
        
        throw new Error(`Spotify API Error: ${errorJson.error} - ${errorJson.error_description || 'Unknown error'}`);
      } catch (parseError) {
        // If JSON parsing fails, throw original error
        if (parseError instanceof Error && parseError.message.includes('Spotify API Error')) {
          throw parseError;
        }
        throw new Error(`Failed to exchange code for token: ${response.status} - ${errorData}`);
      }
    }

    const data = await response.json();
    console.log('✅ Token exchange successful!', {
      access_token: data.access_token?.substring(0, 20) + '...',
      token_type: data.token_type,
      expires_in: data.expires_in,
      has_refresh_token: !!data.refresh_token
    });
    
    // Clean up stored values
    localStorage.removeItem('spotify_code_verifier');
    localStorage.removeItem('spotify_state');
    
    return data;
  } catch (error) {
    console.error('❌ Network error during token exchange:', error);
    throw error;
  }
} 