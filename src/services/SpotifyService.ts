interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
  uri: string;
  preview_url?: string;
}

interface PlaylistTrack {
  title: string;
  artist: string;
  duration: number; // in minutes
  uri: string;
}

export class SpotifyService {
  // Mood to search query mapping - centralized
  private static readonly MOOD_SEARCH_QUERIES: Record<string, string> = {
    '😊': 'happy upbeat pop dance',
    '🙂': 'chill relaxed acoustic indie',
    '😐': 'instrumental focus ambient lo-fi',
    '🙁': 'sad melancholy acoustic alternative',
    '☹️': 'emotional ballad piano'
  };

  // Fallback playlist data
  private static readonly FALLBACK_PLAYLISTS: Record<string, PlaylistTrack[]> = {
    '😊': [
      { title: 'Happy Song', artist: 'Unknown Artist', duration: 3, uri: 'spotify:track:fallback1' },
      { title: 'Upbeat Track', artist: 'Unknown Artist', duration: 4, uri: 'spotify:track:fallback1b' },
    ],
    '🙂': [
      { title: 'Chill Song', artist: 'Unknown Artist', duration: 4, uri: 'spotify:track:fallback2' },
      { title: 'Relaxed Track', artist: 'Unknown Artist', duration: 3, uri: 'spotify:track:fallback2b' },
    ],
    '😐': [
      { title: 'Focus Song', artist: 'Unknown Artist', duration: 5, uri: 'spotify:track:fallback3' },
      { title: 'Ambient Track', artist: 'Unknown Artist', duration: 6, uri: 'spotify:track:fallback3b' },
    ],
    '🙁': [
      { title: 'Sad Song', artist: 'Unknown Artist', duration: 4, uri: 'spotify:track:fallback4' },
      { title: 'Melancholy Track', artist: 'Unknown Artist', duration: 5, uri: 'spotify:track:fallback4b' },
    ],
    '☹️': [
      { title: 'Emotional Song', artist: 'Unknown Artist', duration: 5, uri: 'spotify:track:fallback5' },
      { title: 'Deep Track', artist: 'Unknown Artist', duration: 4, uri: 'spotify:track:fallback5b' },
    ]
  };

  private static getToken(): string | null {
    return localStorage.getItem('spotify_token');
  }

  private static async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No Spotify token found');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem('spotify_token');
      throw new Error('Spotify token expired. Please reconnect.');
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Main method to search for tracks based on mood and duration
   */
  static async searchTracksByMood(mood: string, targetDurationMinutes: number): Promise<PlaylistTrack[]> {
    try {
      console.log('🎵 Searching tracks for mood:', mood, 'duration:', targetDurationMinutes, 'min');
      
      const realTracks = await this.searchRealTracks(mood, targetDurationMinutes);
      
      if (realTracks.length > 0) {
        return realTracks;
      } else {
        throw new Error('No tracks found from search');
      }
    } catch (error) {
      console.error('❌ Real-time search failed, using fallback:', error);
      return this.getMockPlaylist(mood, targetDurationMinutes);
    }
  }

  /**
   * Search for real tracks using Spotify API
   */
  private static async searchRealTracks(mood: string, targetDurationMinutes: number): Promise<PlaylistTrack[]> {
    const query = this.MOOD_SEARCH_QUERIES[mood] || this.MOOD_SEARCH_QUERIES['😐'];
    
    try {
      console.log('🔍 Searching for real tracks with query:', query);

        const searchResults = await this.makeRequest(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20&market=from_token`
        );

      const availableTracks: PlaylistTrack[] = searchResults.tracks.items.map((track: any) => ({
            title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        duration: Math.round(track.duration_ms / 60000),
            uri: track.uri
      }));

      console.log('🎵 Found', availableTracks.length, 'available tracks');

      return this.buildPlaylistToTargetDuration(availableTracks, targetDurationMinutes);

    } catch (error) {
      console.error('❌ Failed to search for real tracks:', error);
      throw error;
    }
  }

  /**
   * Find the best combination of tracks whose total duration is closest to (but not exceeding) the target duration
   */
  private static findBestPlaylistCombination(tracks: PlaylistTrack[], target: number): PlaylistTrack[] {
    let bestCombo: PlaylistTrack[] = [];
    let bestSum = 0;
    const n = tracks.length;
    for (let mask = 1; mask < (1 << n); mask++) {
      let combo: PlaylistTrack[] = [];
      let sum = 0;
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          sum += tracks[i].duration;
          combo.push(tracks[i]);
        }
      }
      if (sum <= target && sum > bestSum) {
        bestSum = sum;
        bestCombo = combo;
      }
      if (sum === target) return combo;
    }
    return bestCombo.length > 0 ? bestCombo : tracks.slice(0, 1);
  }

  /**
   * Build playlist to match target duration from available tracks (now uses best combination)
   */
  private static buildPlaylistToTargetDuration(availableTracks: PlaylistTrack[], targetDurationMinutes: number): PlaylistTrack[] {
    if (!targetDurationMinutes || targetDurationMinutes <= 0) {
      return availableTracks.slice(0, 1); // Return just one track if no duration specified
    }
    return this.findBestPlaylistCombination(availableTracks, targetDurationMinutes);
    }

  /**
   * Generate fallback playlist when API fails
   */
  private static getMockPlaylist(mood: string, targetDuration: number): PlaylistTrack[] {
    const baseTracks = this.FALLBACK_PLAYLISTS[mood] || this.FALLBACK_PLAYLISTS['😐'];
    
    if (!targetDuration || targetDuration <= 0) {
      return baseTracks;
    }

    const playlist: PlaylistTrack[] = [];
    let currentDuration = 0;

    console.log('🔄 Building fallback playlist for', targetDuration, 'minutes');

    // Repeat base tracks until target duration is reached
    let attempts = 0;
    while (currentDuration < targetDuration && attempts < 50) {
      for (const track of baseTracks) {
        if (currentDuration >= targetDuration) break;
        playlist.push({ ...track });
        currentDuration += track.duration;
        console.log(`➕ Fallback added: ${track.title} (${track.duration}min) - Total: ${currentDuration}min`);
      }
      attempts++;
    }

    console.log('✅ Fallback playlist:', playlist.length, 'tracks,', currentDuration, 'minutes total');
    return playlist;
  }

  static async getCurrentUser(): Promise<any> {
    return this.makeRequest('https://api.spotify.com/v1/me');
  }

  static async getDevices(): Promise<any> {
    return this.makeRequest('https://api.spotify.com/v1/me/player/devices');
  }
} 