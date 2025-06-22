# Design & Style Guide: "Jack's Meicho Shimbun"

This document outlines the complete design system, UI/UX philosophy, and content structure for the application. Its purpose is to ensure a consistent, high-quality, and immersive user experience that embodies the "Cyberpunk Tokyo Vaporwave" aesthetic.

## Part 1: Journal Entry Structure & Formatting

The journal entry is the core of the application. Its presentation must be clean, engaging, and rich with metadata.

### 1.1. Entry Fields & Display

Each entry will be displayed as a "ticket" or "report" within the UI.

*   **Title:**
    *   **Element:** `<h1>` or equivalent
    *   **Style:** Large, bold font with a subtle neon glow effect. Can use a gradient text fill (Neon Pink to Royal Blue).
*   **Entry Date (Tokyo Time):**
    *   **Element:** Small, secondary text.
    *   **Style:** Displayed prominently near the title (e.g., "July 26, 2024 - 8:15 PM JST"). Use a monospace font for the time portion.
*   **Content Body:**
    *   **Element:** Standard paragraph text.
    *   **Style:** Highly readable, off-white text on a dark background. Supports basic markdown for formatting (bold, italics, lists).
*   **Location:**
    *   **Element:** A tag-like element with a map pin icon.
    *   **Style:** `Asphalt Grey` background with `Neon Teal` text. Clickable to open an embedded map or a link to Google Maps.
*   **Mood:**
    *   **Element:** An emoji paired with descriptive text.
    *   **Style:** Displayed alongside other metadata. Example: "Mood: Excitement ✨"
*   **Cultural Insights:**
    *   **Element:** A distinct section, perhaps styled like a blockquote.
    *   **Style:** Italicized text, highlighted with a `Vapor Orange` left border to signify it as a special note.

### 1.2. Media Handling

Media is a first-class citizen and should be beautifully integrated.

*   **Layout:** Media should be displayed in a responsive grid or masonry layout within the entry body.
    *   **1 Image:** Full-width.
    *   **2-3 Images:** A flexible grid.
    *   **4+ Images:** A masonry layout that prevents awkward cropping.
*   **Videos:** Displayed with a custom play button overlay featuring a neon pink triangle.
*   **Captions:** Optional text displayed beneath each media item in a smaller, muted font.
*   **Preview:** Clicking on media opens a full-screen modal/lightbox viewer with a dark, blurred background, allowing the user to swipe through all media for that entry.

### 1.3. Tagging

*   **Style:** Tags are displayed as small, pill-shaped elements with a semi-transparent background and a thin neon border.
*   **Auto-tags (AI-generated):** Have a subtle AI icon (e.g., a small brain or star) to differentiate them from manually added tags.
*   **Interactivity:** Clicking a tag should navigate to a view that filters all journal entries containing that tag.

---

## Part 2: UI/UX Design System - "Cyberpunk Tokyo Vaporwave"

This is the visual and interactive language of the application.

### 2.1. Color Palette

*   **Primary Action:**
    *   `Neon Pink`: `#FF6B9D` (Buttons, highlights, active states)
    *   `Neon Teal`: `#00D4FF` (Links, secondary actions, location tags)
    *   `Royal Blue`: `#4A90E2` (Gradients, backgrounds)
*   **Secondary Accent:**
    *   `Vapor Orange`: `#FF8C42` (XP indicators, special highlights)
*   **Backgrounds & Surfaces:**
    *   `Asphalt Grey`: `#2A2A2A` (Card backgrounds)
    *   `Deep Space`: `#121212` (Main page background)
    *   `Gradient BG`: `linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)` for headers or special sections.
*   **Text:**
    *   `Off-White`: `#F0F0F0` (Primary body text)
    *   `Muted Grey`: `#888888` (Secondary text, timestamps)

### 2.2. Typography

*   **Headings:** `Rajdhani` or a similar futuristic, slightly condensed font. Bold weights.
*   **Body:** `Inter` or `Roboto`. Highly readable sans-serif.
*   **Monospace:** `Fira Code` or `Source Code Pro` for timestamps, code snippets, or data display.

### 2.3. Animation & Effects

*   **`neon-glow` (CSS):** Applied to text and borders.
    ```css
    .neon-glow {
      text-shadow: 0 0 5px #FF6B9D, 0 0 10px #FF6B9D, 0 0 15px #FF6B9D;
    }
    .neon-border {
      box-shadow: 0 0 3px #00D4FF, 0 0 5px #00D4FF;
    }
    ```
*   **`tokyo-shimmer` (CSS Animation):** A subtle, slow-moving gradient sweep effect on feature cards.
    ```css
    @keyframes shimmer {
      0% { background-position: -500px 0; }
      100% { background-position: 500px 0; }
    }
    .tokyo-shimmer {
      background: linear-gradient(to right, #2A2A2A 40%, #3A3A3A 50%, #2A2A2A 60%);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite linear;
    }
    ```
*   **`xp-bar` (CSS Transition):** The progress bar for XP should animate its width smoothly over `500ms`.

### 2.4. Core Component Styles

*   **Buttons (`run-button`):**
    *   **Background:** `Neon Pink`
    *   **Text:** White, bold.
    *   **Hover:** Slightly brighter, with an intensified `neon-glow`.
    *   **Shape:** Rounded corners.
*   **Feature Cards (`feature-card`):**
    *   **Background:** `Asphalt Grey`.
    *   **Border:** Optional 1px border of `Neon Teal` or `Neon Pink`.
    *   **Padding:** Generous padding to let content breathe.
    *   **Animation:** Can have the `tokyo-shimmer` effect on hover or by default.
*   **Modals:**
    *   **Overlay:** A semi-transparent dark overlay (`rgba(0, 0, 0, 0.7)`).
    *   **Content:** The modal itself should use `Asphalt Grey` background.
    *   **Animation:** Should fade and scale in from the center.

---

## Part 3: Key Screen Logic & Layout

### 3.1. Dashboard (`MissionControl`)

The central hub for the user.

*   **Layout:** A multi-column responsive grid.
    *   **Top Row:** A full-width `LevelBadge` component showing current level, XP, and progress. Next to it, the `StreakTracker` and `TokyoClock`.
    *   **Main Action:** A prominent, full-width "Draft New Entry" button (`run-button` style).
    *   **Missions:** The `Prompt of the Day` component is a feature card with its timer and "Complete Prompt" action. AI-generated `Side Quests` appear below it in a similar format.
    *   **Recent Activity:** A list or grid of `RecentTickets` (journal entries), showing a truncated preview.

### 3.2. New/Edit Entry Modal

This is where content is created.

*   **Layout:** A clean, multi-section form.
    *   **Title Input:** Large, prominent text input at the top.
    *   **Content Area:** A `textarea` that supports markdown.
    *   **Media Upload:** A drag-and-drop area for photos/videos. Previews of uploaded files appear below it.
    *   **Metadata Section:** A sidebar or bottom section with fields for `Location`, `Mood`, and manual `Tags`.
    *   **Actions:** "Save Draft" and "Publish" buttons. "Publish" should be the primary action style (`run-button`).

This guide should provide a clear and comprehensive vision for any developer to start building the "Jack's Meicho Shimbun" application with consistency and style. 