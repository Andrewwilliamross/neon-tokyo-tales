# Project Blueprint: "Jack's Meicho Shimbun" - AI-Powered Tokyo Travel Journal & Gamified Adventure

## 1. Project Overview & Vision

"Jack's Meicho Shimbun" (Jack's Daily Intelligence Report) is a gamified travel journal specifically designed for your brother's Tokyo adventure. It transforms the traditional travel journal into an engaging, mission-based experience that encourages cultural exploration and documentation.

The app combines the aesthetic of cyberpunk/neon Tokyo with traditional Japanese culture, creating a unique "vaporwave meets Japan" visual experience. Users earn XP, level up through culturally-themed ranks, and complete daily missions that guide them to discover authentic Japanese experiences.

**Core Concept:** Every day in Tokyo becomes a series of side quests and missions. Users document their discoveries through photos, videos, and journal entries, earning points and progressing through levels with Japanese-themed titles like "Ramen Apprentice" → "JR Line Conductor" → "Yakuza CEO."

## 2. Core Features & User Stories

### Gamification System:
* **Level Progression:** Users start as "Gaijin" and progress through 10 levels with Japanese-themed titles and emojis:
  * Level 1: "Gaijin" 🧍‍♂️ (0 XP)
  * Level 2: "Language School Student" 👨‍🎓 (500 XP)
  * Level 3: "Ramen Apprentice" 🏮 (1,200 XP)
  * Level 4: "JR Line Conductor" 🚆 (2,500 XP)
  * Level 5: "Salaryman" 🏢 (5,000 XP)
  * Level 6: "Izakaya Manager" 🍶 (8,500 XP)
  * Level 7: "Prefecture Governor" 🏯 (14,000 XP)
  * Level 8: "Shinjuku Police Chief" 🚓 (22,000 XP)
  * Level 9: "Shadow Cabinet Minister" 🗾 (35,000 XP)
  * Level 10: "Yakuza CEO" 🕴️ (50,000 XP)

* **XP Rewards:**
  * Daily journal entry: +25 XP
  * Photo upload: +10 XP per photo
  * Video upload: +20 XP per video
  * Prompt completion: +50 XP
  * Location check-in: +15 XP
  * Streak bonus: +5 XP per consecutive day

### Daily Missions & Side Quests:
* **Prompt of the Day:** AI-generated daily challenges that expire at midnight Tokyo time:
  * "Take a photo of the weirdest vending machine you encounter today"
  * "Find and document a unique Japanese convenience store item"
  * "Capture the most crowded train station you visit"
  * "Photograph a traditional Japanese architectural element"
  * "Find and document a local street food vendor"
  * "Take a picture of an interesting public transportation sign"
  * "Capture a moment of Japanese work culture"
  * "Document a unique Japanese technology or automation"
  * "Find and photograph a hidden shrine or temple"
  * "Capture a moment of Japanese pop culture"

* **AI-Generated Side Quests:** Based on user location, preferences, and current level, the AI creates personalized missions:
  * "Visit the nearest ramen shop and document your experience"
  * "Find a local izakaya and photograph the atmosphere"
  * "Discover a hidden alleyway in your current district"
  * "Document the morning rush hour at the nearest station"

### Journal & Media Management:
* **Rich Media Entries:** Users can create journal entries with:
  * Title and detailed text content
  * Multiple photo uploads
  * Video uploads
  * Location tagging with Japanese place names
  * Mood/emotion tracking
  * Cultural insights and observations

* **Memory Timeline:** Chronological view of all entries with Tokyo timezone display

### Tokyo-Specific Features:
* **Real-time Tokyo Clock:** Live display of current Tokyo time and date
* **Location-Based Quests:** AI generates missions based on user's current location in Tokyo
* **Cultural Context:** AI provides background information about locations, customs, and cultural significance
* **Language Helper:** Basic Japanese phrases and translations for common situations

## 3. UI/UX Philosophy & Visual Style

### Aesthetic: "Cyberpunk Tokyo Vaporwave"
* **Color Palette:**
  * Primary: Neon pink (#FF6B9D), Neon teal (#00D4FF), Royal blue (#4A90E2)
  * Secondary: Vapor orange (#FF8C42), Asphalt grey (#2A2A2A)
  * Background: Dark gradients with subtle neon glows
  * Text: White with neon glow effects

* **Visual Elements:**
  * Neon glow effects on important UI elements
  * Gradient backgrounds (pink to blue)
  * Japanese-inspired icons and emojis
  * Cyberpunk-style progress bars and XP meters
  * "Tokyo shimmer" animations
  * Vaporwave-style card designs with neon borders

* **Typography:**
  * Modern, clean fonts with neon glow effects
  * Japanese-style spacing and layout
  * Bold, impactful headings with gradient text effects

### Responsive Design:
* **Mobile-First:** Optimized for iPhone/Android use while traveling
* **Desktop Enhancement:** Rich dashboard experience for planning and review
* **Touch-Friendly:** Large buttons and intuitive gestures for mobile use

## 4. Technical Architecture & Stack

### Frontend: Next.js 14 (App Router)
* **Framework:** Next.js with TypeScript for type safety
* **Styling:** Tailwind CSS with custom neon/vaporwave theme
* **UI Components:** shadcn/ui with custom cyberpunk styling
* **State Management:** Zustand for client state, React Query for server state
* **Forms:** React Hook Form with Zod validation
* **Icons:** Lucide React + custom Japanese-themed icons

### Backend: Supabase
* **Database:** PostgreSQL with pgvector for AI embeddings
* **Authentication:** Supabase Auth with email/password
* **Storage:** Supabase Storage for media files
* **Real-time:** Supabase subscriptions for live updates
* **Edge Functions:** For AI processing and location-based features

### AI Integration:
* **OpenAI API:** For generating daily prompts, side quests, and cultural insights
* **Embeddings:** For semantic search of journal entries
* **Location AI:** For generating location-specific missions
* **Image Analysis:** For auto-tagging photos with cultural context

## 5. Database Schema

\`\`\`sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enums
CREATE TYPE media_type AS ENUM ('image', 'video');
CREATE TYPE entry_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE quest_status AS ENUM ('active', 'completed', 'expired');

-- Users table (extends Supabase auth)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    current_level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_entry_date DATE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    location_name TEXT,
    location_coordinates POINT,
    mood TEXT,
    cultural_insights TEXT,
    prompt_text TEXT, -- If entry was created for a specific prompt
    status entry_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- AI fields
    embedding vector(1536),
    auto_tags TEXT[]
);

-- Media files
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID REFERENCES entries(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    storage_path TEXT NOT NULL,
    media_type media_type NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily prompts/missions
CREATE TABLE daily_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    prompt_text TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 50,
    expires_at TIMESTAMPTZ NOT NULL,
    status quest_status DEFAULT 'active',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Side quests
CREATE TABLE side_quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location_hint TEXT,
    xp_reward INTEGER NOT NULL,
    difficulty TEXT, -- 'easy', 'medium', 'hard'
    cultural_context TEXT,
    expires_at TIMESTAMPTZ,
    status quest_status DEFAULT 'active',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- XP transactions log
CREATE TABLE xp_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL,
    entry_id UUID REFERENCES entries(id),
    quest_id UUID REFERENCES side_quests(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE side_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
-- [Standard RLS policies for all tables]
\`\`\`

## 6. Key Implementation Features

### AI-Powered Side Quest Generation:
\`\`\`typescript
// Edge Function: generate-side-quests
export async function generateSideQuests(userId: string, location: Point) {
  const userProfile = await getUserProfile(userId);
  const nearbyPlaces = await getNearbyPlaces(location);
  
  const prompt = \`
    Generate 3 side quests for a level \${userProfile.current_level} traveler in Tokyo.
    Current location: \${location}
    Nearby places: \${nearbyPlaces}
    User preferences: \${userProfile.preferences}
    
    Each quest should:
    - Be culturally enriching
    - Match the user's current level
    - Include specific location hints
    - Award appropriate XP (10-100 based on difficulty)
    - Provide cultural context
  \`;
  
  const quests = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });
  
  return quests.choices[0].message.content;
}
\`\`\`

### Real-time Tokyo Clock Component:
\`\`\`typescript
export const TokyoClock = () => {
  const [tokyoTime, setTokyoTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const tokyoTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date());
      setTokyoTime(tokyoTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="tokyo-clock neon-glow">
      <div className="text-3xl font-bold">{tokyoTime}</div>
      <div className="text-sm">Tokyo, Japan</div>
    </div>
  );
};
\`\`\`

### Gamified Entry Creation:
\`\`\`typescript
export const createEntry = async (entryData: EntryData) => {
  // Create entry
  const entry = await supabase.from('entries').insert({
    ...entryData,
    user_id: currentUser.id
  });
  
  // Award XP
  let xpEarned = 25; // Base entry XP
  
  if (entryData.media?.length > 0) {
    xpEarned += entryData.media.length * 10; // +10 per photo
  }
  
  if (entryData.location_coordinates) {
    xpEarned += 15; // Location bonus
  }
  
  // Check for prompt completion
  if (entryData.prompt_text) {
    xpEarned += 50; // Prompt completion bonus
  }
  
  // Update user XP and level
  await updateUserXP(currentUser.id, xpEarned);
  
  return entry;
};
\`\`\`

## 7. Deployment & Production Considerations

* **Vercel:** For Next.js frontend deployment
* **Supabase:** For backend services and database
* **CDN:** For optimized media delivery
* **Monitoring:** Error tracking and performance monitoring
* **SEO:** Optimized for sharing travel experiences 