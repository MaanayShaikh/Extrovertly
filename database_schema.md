# Extrovertly Database Schema

## Overview
This schema is designed for the Extrovertly application, a social confidence building platform that helps users develop their social skills through journaling, missions, events, AI coaching, and progress tracking.

## Database Tables

### 1. Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSONB DEFAULT '{}',
    confidence_level DECIMAL(3,1) DEFAULT 3.0 CHECK (confidence_level >= 1.0 AND confidence_level <= 10.0),
    total_points INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0
);
```

### 2. User_Profiles
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    social_goals TEXT[],
    comfort_levels JSONB DEFAULT '{}',
    interests TEXT[],
    social_contexts JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Journal_Entries
```sql
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    mood VARCHAR(50) NOT NULL,
    reflection_prompt VARCHAR(500),
    tags TEXT[],
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    word_count INTEGER GENERATED ALWAYS AS (array_length(regexp_split_to_array(content, '\s+'), 1)) STORED
);
```

### 4. Missions
```sql
CREATE TABLE missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    category VARCHAR(100) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    time_estimate VARCHAR(50),
    tips TEXT[],
    requirements JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 5. User_Missions
```sql
CREATE TABLE user_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'skipped')),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    UNIQUE(user_id, mission_id)
);
```

### 6. Events
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    comfort_level VARCHAR(20) NOT NULL CHECK (comfort_level IN ('low', 'medium', 'high')),
    max_attendees INTEGER,
    price DECIMAL(10,2) DEFAULT 0.00,
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organizer_name VARCHAR(200),
    social_context JSONB DEFAULT '{}',
    tags TEXT[],
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Event_Attendees
```sql
CREATE TABLE event_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'interested' CHECK (status IN ('interested', 'going', 'not_going', 'attended')),
    rsvp_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    attended_at TIMESTAMP WITH TIME ZONE,
    feedback TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    UNIQUE(event_id, user_id)
);
```

### 8. Achievements
```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(10) NOT NULL,
    category VARCHAR(100),
    requirements JSONB NOT NULL,
    points_reward INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 9. User_Achievements
```sql
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0,
    max_progress INTEGER DEFAULT 1,
    UNIQUE(user_id, achievement_id)
);
```

### 10. Coach_Conversations
```sql
CREATE TABLE coach_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    session_summary TEXT
);
```

### 11. Coach_Messages
```sql
CREATE TABLE coach_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES coach_conversations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender VARCHAR(10) NOT NULL CHECK (sender IN ('user', 'coach')),
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'scenario', 'advice')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);
```

### 12. Progress_Tracking
```sql
CREATE TABLE progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tracking_date DATE NOT NULL,
    confidence_level DECIMAL(3,1) CHECK (confidence_level >= 1.0 AND confidence_level <= 10.0),
    mood VARCHAR(50),
    activities_completed INTEGER DEFAULT 0,
    journal_entries INTEGER DEFAULT 0,
    events_attended INTEGER DEFAULT 0,
    missions_completed INTEGER DEFAULT 0,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tracking_date)
);
```

### 13. Weekly_Insights
```sql
CREATE TABLE weekly_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    insight_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_start_date, insight_type)
);
```

### 14. Mood_Tracking
```sql
CREATE TABLE mood_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mood VARCHAR(50) NOT NULL,
    intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10),
    context TEXT,
    triggers TEXT[],
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 15. Social_Goals
```sql
CREATE TABLE social_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    target_value INTEGER,
    current_value INTEGER DEFAULT 0,
    target_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_journal_entries_user_date ON journal_entries(user_id, created_at DESC);
CREATE INDEX idx_user_missions_user_status ON user_missions(user_id, status);
CREATE INDEX idx_event_attendees_event_status ON event_attendees(event_id, status);
CREATE INDEX idx_progress_tracking_user_date ON progress_tracking(user_id, tracking_date DESC);
CREATE INDEX idx_coach_messages_conversation_time ON coach_messages(conversation_id, timestamp);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_missions_difficulty_category ON missions(difficulty, category);
CREATE INDEX idx_events_date_category ON events(date, category);
CREATE INDEX idx_mood_tracking_user_date ON mood_tracking(user_id, recorded_at DESC);
```

## Triggers

```sql
-- Update user points when missions are completed
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE users 
        SET total_points = total_points + (SELECT points FROM missions WHERE id = NEW.mission_id)
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_points
    AFTER UPDATE ON user_missions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_points();

-- Update user streak when journal entries are created
CREATE OR REPLACE FUNCTION update_journal_streak()
RETURNS TRIGGER AS $$
BEGIN
    -- Logic to calculate and update streak
    UPDATE users 
    SET streak_days = (
        SELECT COUNT(DISTINCT DATE(created_at))
        FROM journal_entries 
        WHERE user_id = NEW.user_id 
        AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    )
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_journal_streak
    AFTER INSERT ON journal_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_journal_streak();
```

## Views

```sql
-- User dashboard summary view
CREATE VIEW user_dashboard_summary AS
SELECT 
    u.id,
    u.username,
    u.confidence_level,
    u.total_points,
    u.streak_days,
    COUNT(DISTINCT je.id) as total_journal_entries,
    COUNT(DISTINCT um.id) FILTER (WHERE um.status = 'completed') as completed_missions,
    COUNT(DISTINCT ea.id) FILTER (WHERE ea.status = 'attended') as events_attended,
    COUNT(DISTINCT ua.id) as achievements_earned
FROM users u
LEFT JOIN journal_entries je ON u.id = je.user_id
LEFT JOIN user_missions um ON u.id = um.user_id
LEFT JOIN event_attendees ea ON u.id = ea.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
GROUP BY u.id, u.username, u.confidence_level, u.total_points, u.streak_days;

-- Weekly progress view
CREATE VIEW weekly_progress AS
SELECT 
    u.id as user_id,
    DATE_TRUNC('week', pt.tracking_date) as week_start,
    AVG(pt.confidence_level) as avg_confidence,
    SUM(pt.activities_completed) as total_activities,
    SUM(pt.points_earned) as total_points,
    COUNT(DISTINCT je.id) as journal_entries,
    COUNT(DISTINCT um.id) FILTER (WHERE um.status = 'completed') as missions_completed
FROM users u
LEFT JOIN progress_tracking pt ON u.id = pt.user_id
LEFT JOIN journal_entries je ON u.id = je.user_id 
    AND je.created_at >= DATE_TRUNC('week', pt.tracking_date)
    AND je.created_at < DATE_TRUNC('week', pt.tracking_date) + INTERVAL '1 week'
LEFT JOIN user_missions um ON u.id = um.user_id 
    AND um.completed_at >= DATE_TRUNC('week', pt.tracking_date)
    AND um.completed_at < DATE_TRUNC('week', pt.tracking_date) + INTERVAL '1 week'
GROUP BY u.id, DATE_TRUNC('week', pt.tracking_date);
```

## Sample Data Inserts

```sql
-- Sample missions
INSERT INTO missions (title, description, difficulty, category, points, time_estimate, tips) VALUES
('Start a Conversation', 'Initiate a conversation with someone new today', 'beginner', 'conversation', 10, '5-10 minutes', ARRAY['Make eye contact', 'Ask open-ended questions', 'Listen actively']),
('Give a Compliment', 'Give a genuine compliment to someone', 'beginner', 'social_skills', 15, '2-5 minutes', ARRAY['Be specific', 'Be genuine', 'Choose appropriate timing']),
('Join a Group Discussion', 'Participate in a group conversation', 'intermediate', 'group_social', 25, '15-30 minutes', ARRAY['Listen first', 'Build on others'' points', 'Share relevant experiences']);

-- Sample achievements
INSERT INTO achievements (title, description, icon, category, requirements, points_reward) VALUES
('First Steps', 'Write your first journal entry', '📝', 'journaling', '{"journal_entries": 1}', 50),
('Consistent Writer', 'Journal for 7 days in a row', '🔥', 'journaling', '{"streak_days": 7}', 100),
('Social Butterfly', 'Attend 5 social events', '🦋', 'events', '{"events_attended": 5}', 200),
('Conversation Starter', 'Complete 10 conversation missions', '💬', 'missions', '{"conversation_missions": 10}', 150);
```

## Notes

1. **UUID Primary Keys**: All tables use UUID primary keys for better distribution and security
2. **JSONB Fields**: Used for flexible data storage (preferences, social_context, requirements)
3. **Check Constraints**: Enforce data integrity for enums and numeric ranges
4. **Generated Columns**: Used for computed values like word count
5. **Triggers**: Automatically update related data (points, streaks)
6. **Views**: Provide convenient access to aggregated data
7. **Indexes**: Optimize query performance for common access patterns

This schema supports all the features identified in the codebase including user management, journaling, missions, events, achievements, coaching conversations, progress tracking, and analytics.
