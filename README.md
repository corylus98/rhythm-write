# RhythmWrite

### Users
#### Target Users
- People looking for a relaxing way to write down their thoughts.
- People who enjoy music when writing.
- People who seek support and feedback.
#### User Needs
- A writing environment with personalized music.
- The ability to receive friendly feedback.
- A visually appealing and easy-to-use interface.
> **Live Demo:** [https://rhythmwrite.space](https://rhythmwrite.space)

A minimalistic, music-driven journaling web app that helps you reflect, relax, and reconnect—with mood-matched playlists, AI feedback, and a clean, modern interface.
---

## ✨ Features

- **Minimalist Journal Writing**: Clean, distraction-free writing page with a large, elegant timer and a fixed, minimal music player bar.
- **Mood-Based Playlists**: Check in with your mood (icon-only), gratitude, and time goal. RhythmWrite generates a Spotify playlist to match your mood and writing duration.
- **Spotify Integration**: Log in with Spotify for personalized playlists and in-app music playback (Spotify Premium required for playback control).
- **Timer-Linked Music**: Timer and music playback are linked—start writing, and your playlist starts; pause writing, and music pauses.
- **AI Feedback**: (Planned) Receive supportive, friendly feedback on your journal entries from an AI-powered virtual friend.
- **Journal History**: Entries are saved with mood, gratitude, and (optionally) a title. View your history grouped by year/month, with mood icons and gratitude.
- **Accessibility**: All icons and buttons have tooltips and accessible labels.
- **Modern, Consistent UI**: Unified NavBar, vertical lines, and consistent typography (Instrument Serif & Instrument Sans). User avatar is a circle with initials.

---

## 🖥️ Main Pages

- **Home**: Project intro and navigation.
- **Journal Flow** (`/journal`): Step-based check-in (mood, gratitude, time, playlist).
- **Journal Writing** (`/journal/write`): Main writing interface with timer and music.
- **History** (`/history`): View and read past journal entries.
- **(Planned) Profile/Settings**: User profile and preferences.

---

## 🧩 Components

- **NavBar**: Unified navigation and top border.
- **MoodCheckinStep, GratitudeStep, TimeGoalStep, PlaylistStep**: Pre-journaling workflow.
- **MusicPlayer**: Fixed, minimal bottom bar on the writing page.
- **Journal History**: Grouped by year/month, with mood icons and gratitude.
- **Home Sections**: Hero, Quote, How It Works, Footer (with musical note icon).

---

## 🗂️ Project Structure

```
src/
  components/
    Home/
    Journal/
    JournalWrite/
  pages/
  assets/
  hooks/
  utils/
  contexts/
  App.tsx
  index.tsx
```

---

## 🚀 Getting Started

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

### Spotify Integration

- **Spotify Premium is required** for in-app music playback control (Spotify API limitation).
- Log in with your Spotify account for the best experience.
- If you don't have Premium, you can still get playlist recommendations and play music manually in Spotify.

---

## 📝 Development Notes

- The codebase is clean, modern, and ready for demo or deployment.
- Accessibility and UI/UX best practices are followed throughout.
- Obsolete and non-English files have been removed.

---

## 👥 Credits

- **Jazmyn Zhang** — minjia27@uw.edu, [Jaazmyn](https://github.com/Jaazmyn)
- **Hazel Chen** — hazelycc@uw.edu, [corylus98](https://github.com/corylus98)

---

## 📅 Roadmap

| Phase         | Milestone                        | Due Date  |
|---------------|----------------------------------|-----------|
| Planning      | Complete requirements document   | 4/7       |
| Design        | Complete system/interface design | 4/18, 5/2 |
| Development   | Journal input, playlist, chatbot | 4/25–5/16 |
| Testing       | Test and fix                     | 5/27      |
| Launch        | Go live!                         | 5/30      |
