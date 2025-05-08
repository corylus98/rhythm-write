# rhythm-write
### Project Objectives
- Develop a web-based journaling application that enhances the writing experience through music and AI-driven feedback.
- Encourage users to engage in regular journaling by providing structured prompts and a time-matched music playlist.
- Offer an interactive AI-powered virtual "friend" to provide supportive feedback on journal entries.
- Create a seamless and intuitive user experience that fosters reflection, relaxation, and self-expression.

### Users
#### Target Users
- People looking for a relaxing way to write down their thoughts.
- People who enjoy music when writing.
- People who seek support and feedback.
#### User Needs
- A writing environment with personalized music.
- The ability to receive friendly feedback.
- A visually appealing and easy-to-use interface.

---

### Features
#### Planned Features
- Journal Input – Users can type to journal in the web application.
- Guided Prompts System – Predefined and customizable prompts to help users start journaling.
- Personalized Music Playlist Integration – A feature that suggests music based on user-selected 
journaling time and mood.
- AI-Powered Chatbot – An interactive assistant providing supportive feedback on journal entries.
#### Nice-to-have Features
- User Profile & Data Management – Secure storage for past journal entries and user preferences.
- Sync with Spotify – Sync with users’ Spotify accounts to suggest music that they usually like.
#### Features Updated(4/11)
- Journal Input and stored previous journals
- Prompts of journal suggestion/tags input (mood, time, playlist)
- Playlist on the side or bottome with a timer(API Spotify)
- Virtual Friend (feedback)

#### Features & Workflow (2025-05-02)
- **Unified NavBar**: All pages use a single, consistent NavBar for navigation and top border.
- **Vertical Lines**: Two fixed 1px vertical lines (#341A00), 240px from each edge, frame the main content (do not scroll with content).
- **Responsive, Pixel-Perfect Layout**: Uses MUI's sx prop, CSS clamp, and fixed/absolute positioning for robust, Figma-matching layouts.
- **Precheck Flow**: Mood Check-in → Gratitude → Time Goal → Playlist, all with controlled components and state managed in the parent.
- **Playlist Generation**: Playlist matches user's time goal and mood.
- **Writing Page**: Left-aligned content, large editable title, plus icon, and minimalist textarea. NavBar shows timer and play/pause.
- **SVG Mood Icons**: Minimalist, Kinfolk-style SVG mood icons for mood selection.
- **Clean Codebase**: Removed unused files/components (e.g., TopBar), fixed all linter warnings, and clarified file structure.

---

## Main Pages
- **HomePage**: Landing page with project intro and navigation.
- **PrecheckPage** (`/journal`): Step-based workflow for mood, gratitude, time, and playlist.
- **JournalWritePage** (`/journal/write`): Main writing interface with timer, music, and prompts.
- **ArchivedPage**: View previous journal entries.
- **ProfileSettings**: User profile and settings.

## Components
- **NavBar**: Unified navigation and top border.
- **Journal/GratitudeStep, MoodCheckinStep, TimeGoalStep**: Precheck workflow steps.
- **Home/HeroSection, QuoteSection, HowItWorksSection, FooterSection**: Home page sections.

## Assets
- Minimalist SVG and PNG icons for moods, music, and UI.

---

## Project Structure
```
src/
  components/
    Home/
    Journal/
  pages/
  assets/
  hooks/
  utils/
  App.tsx
  index.tsx
```

---

## Setup & Development
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

### Roadmaps
| Phase       | Milestone                          | Due Date  |
|------------|-----------------------------------|----------|
| **Planning**  | Complete requirements document  | 4/7      |
| **Design**    | Complete system design          | 4/18     |
|             | Complete interface design       | 5/2      |
| **Development** | Complete journal input         | 4/25     |
|             | Complete music playlist suggestion | 5/9      |
|             | Complete interactive chatbot     | 5/16     |
| **Testing**   | Test and fix                    | 5/27     |
| **Launch**    | Go live!                        | 5/30     |

## Contact Information
- Jazmyn Zhang, minjia27@uw.edu, Jaazmyn@github
- Hazel Chen, hazelycc@uw.edu, corylus98@github
