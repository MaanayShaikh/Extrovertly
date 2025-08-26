# Extrovertly Convex Schema Documentation

## Overview

This document describes the Convex database schema for the Extrovertly social confidence building application. The schema has been converted from the original SQL design to use Convex's document-relational database patterns.

## Schema Conversion Notes

### Key Differences from SQL to Convex

1. **Document-Relational Model**: Convex uses a document-relational approach where documents are JSON-like objects with nested structures
2. **Automatic IDs**: Convex automatically generates `_id` and `_creationTime` fields for all documents
3. **Type Validation**: Uses Convex's `v` validator system for runtime type checking
4. **Indexes**: Defined using `.index()` and `.searchIndex()` methods on table definitions
5. **Relationships**: Uses `v.id("tableName")` for foreign key references
6. **Timestamps**: Stored as numbers (milliseconds since epoch) instead of SQL timestamps
7. **JSON Fields**: Uses `v.any()` for flexible JSON storage (equivalent to JSONB)

## Table Definitions

### 1. Users Table
```typescript
users: defineTable({
  email: v.string(),
  username: v.string(),
  firstName: v.string(),
  lastName: v.optional(v.string()),
  avatarUrl: v.optional(v.string()),
  dateOfBirth: v.optional(v.string()), // ISO date string
  lastLoginAt: v.optional(v.number()), // timestamp
  isActive: v.boolean(),
  preferences: v.optional(v.any()), // JSONB equivalent
  confidenceLevel: v.number(), // 1.0 to 10.0
  totalPoints: v.number(),
  streakDays: v.number(),
  longestStreak: v.number(),
})
```

**Indexes:**
- `by_email`: For email lookups
- `by_username`: For username lookups  
- `by_confidence_level`: For confidence-based queries

### 2. User Profiles Table
```typescript
userProfiles: defineTable({
  userId: v.id("users"),
  bio: v.optional(v.string()),
  socialGoals: v.optional(v.array(v.string())),
  comfortLevels: v.optional(v.any()), // JSONB equivalent
  interests: v.optional(v.array(v.string())),
  socialContexts: v.optional(v.any()), // JSONB equivalent
})
```

**Indexes:**
- `by_user_id`: For user profile lookups

### 3. Journal Entries Table
```typescript
journalEntries: defineTable({
  userId: v.id("users"),
  content: v.string(),
  mood: v.string(),
  reflectionPrompt: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  isPrivate: v.boolean(),
  wordCount: v.optional(v.number()),
})
```

**Indexes:**
- `by_user_id`: For user's journal entries
- `by_user_date`: For chronological journal entries
- `by_mood`: For mood-based queries
- `search_content`: Full-text search on journal content

### 4. Missions Table
```typescript
missions: defineTable({
  title: v.string(),
  description: v.string(),
  difficulty: v.union(
    v.literal("beginner"),
    v.literal("intermediate"),
    v.literal("advanced")
  ),
  category: v.string(),
  points: v.number(),
  timeEstimate: v.optional(v.string()),
  tips: v.optional(v.array(v.string())),
  requirements: v.optional(v.any()), // JSONB equivalent
  isActive: v.boolean(),
})
```

**Indexes:**
- `by_difficulty`: For difficulty-based filtering
- `by_category`: For category-based filtering
- `by_difficulty_category`: For combined difficulty/category queries
- `search_missions`: Full-text search on mission titles

### 5. User Missions Table
```typescript
userMissions: defineTable({
  userId: v.id("users"),
  missionId: v.id("missions"),
  status: v.union(
    v.literal("assigned"),
    v.literal("in_progress"),
    v.literal("completed"),
    v.literal("skipped")
  ),
  assignedAt: v.number(), // timestamp
  startedAt: v.optional(v.number()), // timestamp
  completedAt: v.optional(v.number()), // timestamp
  notes: v.optional(v.string()),
  difficultyRating: v.optional(v.number()), // 1-5
  satisfactionRating: v.optional(v.number()), // 1-5
})
```

**Indexes:**
- `by_user_id`: For user's missions
- `by_user_status`: For user's missions by status
- `by_mission_id`: For mission participants
- `by_user_mission`: Unique constraint on user-mission pairs

### 6. Events Table
```typescript
events: defineTable({
  title: v.string(),
  description: v.string(),
  date: v.string(), // ISO date string
  time: v.string(), // ISO time string
  location: v.optional(v.string()),
  category: v.string(),
  comfortLevel: v.union(
    v.literal("low"),
    v.literal("medium"),
    v.literal("high")
  ),
  maxAttendees: v.optional(v.number()),
  price: v.number(), // decimal as number
  organizerId: v.optional(v.id("users")),
  organizerName: v.optional(v.string()),
  socialContext: v.optional(v.any()), // JSONB equivalent
  tags: v.optional(v.array(v.string())),
  imageUrl: v.optional(v.string()),
  isActive: v.boolean(),
})
```

**Indexes:**
- `by_date`: For date-based event queries
- `by_category`: For category-based filtering
- `by_comfort_level`: For comfort level filtering
- `by_organizer`: For organizer's events
- `by_date_category`: For combined date/category queries
- `search_events`: Full-text search on event titles

### 7. Event Attendees Table
```typescript
eventAttendees: defineTable({
  eventId: v.id("events"),
  userId: v.id("users"),
  status: v.union(
    v.literal("interested"),
    v.literal("going"),
    v.literal("not_going"),
    v.literal("attended")
  ),
  rsvpAt: v.number(), // timestamp
  attendedAt: v.optional(v.number()), // timestamp
  feedback: v.optional(v.string()),
  rating: v.optional(v.number()), // 1-5
})
```

**Indexes:**
- `by_event_id`: For event attendees
- `by_user_id`: For user's event participation
- `by_event_status`: For event attendees by status
- `by_user_status`: For user's events by status

### 8. Achievements Table
```typescript
achievements: defineTable({
  title: v.string(),
  description: v.string(),
  icon: v.string(),
  category: v.optional(v.string()),
  requirements: v.any(), // JSONB equivalent
  pointsReward: v.number(),
  isActive: v.boolean(),
})
```

**Indexes:**
- `by_category`: For category-based achievement queries
- `by_points`: For points-based sorting

### 9. User Achievements Table
```typescript
userAchievements: defineTable({
  userId: v.id("users"),
  achievementId: v.id("achievements"),
  earnedAt: v.number(), // timestamp
  progress: v.number(),
  maxProgress: v.number(),
})
```

**Indexes:**
- `by_user_id`: For user's achievements
- `by_achievement_id`: For achievement earners
- `by_user_achievement`: Unique constraint on user-achievement pairs

### 10. Coach Conversations Table
```typescript
coachConversations: defineTable({
  userId: v.id("users"),
  sessionId: v.string(),
  endedAt: v.optional(v.number()), // timestamp
  sessionSummary: v.optional(v.string()),
})
```

**Indexes:**
- `by_user_id`: For user's coaching sessions
- `by_session_id`: For session lookups
- `by_user_session`: For user-session pairs

### 11. Coach Messages Table
```typescript
coachMessages: defineTable({
  conversationId: v.id("coachConversations"),
  content: v.string(),
  sender: v.union(v.literal("user"), v.literal("coach")),
  messageType: v.union(
    v.literal("text"),
    v.literal("scenario"),
    v.literal("advice")
  ),
  metadata: v.optional(v.any()), // JSONB equivalent
})
```

**Indexes:**
- `by_conversation_id`: For conversation messages
- `by_conversation_time`: For chronological message ordering
- `by_sender`: For sender-based filtering

### 12. Progress Tracking Table
```typescript
progressTracking: defineTable({
  userId: v.id("users"),
  trackingDate: v.string(), // ISO date string
  confidenceLevel: v.optional(v.number()), // 1.0 to 10.0
  mood: v.optional(v.string()),
  activitiesCompleted: v.number(),
  journalEntries: v.number(),
  eventsAttended: v.number(),
  missionsCompleted: v.number(),
  pointsEarned: v.number(),
})
```

**Indexes:**
- `by_user_id`: For user's progress data
- `by_user_date`: For chronological progress tracking
- `by_date`: For date-based progress queries

### 13. Weekly Insights Table
```typescript
weeklyInsights: defineTable({
  userId: v.id("users"),
  weekStartDate: v.string(), // ISO date string
  insightType: v.string(),
  title: v.string(),
  description: v.string(),
  data: v.optional(v.any()), // JSONB equivalent
  isRead: v.boolean(),
})
```

**Indexes:**
- `by_user_id`: For user's insights
- `by_user_week`: For weekly insight lookups
- `by_insight_type`: For insight type filtering

### 14. Mood Tracking Table
```typescript
moodTracking: defineTable({
  userId: v.id("users"),
  mood: v.string(),
  intensity: v.optional(v.number()), // 1-10
  context: v.optional(v.string()),
  triggers: v.optional(v.array(v.string())),
})
```

**Indexes:**
- `by_user_id`: For user's mood entries
- `by_user_date`: For chronological mood tracking
- `by_mood`: For mood-based analysis

### 15. Social Goals Table
```typescript
socialGoals: defineTable({
  userId: v.id("users"),
  title: v.string(),
  description: v.optional(v.string()),
  category: v.optional(v.string()),
  targetValue: v.optional(v.number()),
  currentValue: v.number(),
  targetDate: v.optional(v.string()), // ISO date string
  status: v.union(
    v.literal("active"),
    v.literal("completed"),
    v.literal("paused"),
    v.literal("cancelled")
  ),
})
```

**Indexes:**
- `by_user_id`: For user's goals
- `by_user_status`: For user's goals by status
- `by_category`: For category-based goal queries
- `search_goals`: Full-text search on goal titles

## Usage Examples

### Creating a User
```typescript
import { mutation } from "convex/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      email: args.email,
      username: args.username,
      firstName: args.firstName,
      lastName: args.lastName,
      isActive: true,
      confidenceLevel: 3.0,
      totalPoints: 0,
      streakDays: 0,
      longestStreak: 0,
    });
    return userId;
  },
});
```

### Querying User's Journal Entries
```typescript
import { query } from "convex/server";

export const getUserJournalEntries = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("journalEntries")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});
```

### Creating a Mission Assignment
```typescript
export const assignMission = mutation({
  args: {
    userId: v.id("users"),
    missionId: v.id("missions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("userMissions", {
      userId: args.userId,
      missionId: args.missionId,
      status: "assigned",
      assignedAt: Date.now(),
    });
  },
});
```

### Searching Events
```typescript
export const searchEvents = query({
  args: {
    searchTerm: v.string(),
    category: v.optional(v.string()),
    comfortLevel: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("events").withSearchIndex("search_events", (q) => 
      q.search("title", args.searchTerm)
    );
    
    if (args.category) {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }
    
    if (args.comfortLevel) {
      query = query.filter((q) => q.eq(q.field("comfortLevel"), args.comfortLevel));
    }
    
    return await query.collect();
  },
});
```

## Data Migration Considerations

### From SQL to Convex

1. **UUID Conversion**: SQL UUIDs become Convex string IDs
2. **Timestamp Conversion**: SQL timestamps become JavaScript numbers (milliseconds)
3. **Date/Time Fields**: Store as ISO strings for consistency
4. **JSONB Fields**: Use `v.any()` for flexible JSON storage
5. **Foreign Keys**: Use `v.id("tableName")` for relationships
6. **Enums**: Use `v.union(v.literal(...))` for constrained values

### Sample Data Migration

```typescript
// Example: Migrating a user from SQL to Convex
const sqlUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  email: "user@example.com",
  username: "user123",
  first_name: "John",
  last_name: "Doe",
  created_at: "2024-01-01T00:00:00Z",
  confidence_level: 4.5,
  total_points: 150,
  streak_days: 7,
  longest_streak: 14
};

// Convert to Convex format
const convexUser = {
  email: sqlUser.email,
  username: sqlUser.username,
  firstName: sqlUser.first_name,
  lastName: sqlUser.last_name,
  confidenceLevel: sqlUser.confidence_level,
  totalPoints: sqlUser.total_points,
  streakDays: sqlUser.streak_days,
  longestStreak: sqlUser.longest_streak,
  isActive: true,
};
```

## Performance Considerations

1. **Index Usage**: Always use indexes for filtering and sorting operations
2. **Search Indexes**: Use search indexes for full-text search capabilities
3. **Compound Indexes**: Create compound indexes for multi-field queries
4. **Pagination**: Use `.paginate()` for large result sets
5. **Real-time Updates**: Leverage Convex's reactive queries for live data

## Best Practices

1. **Type Safety**: Use TypeScript with generated types from `convex/_generated/dataModel`
2. **Validation**: Leverage Convex validators for runtime type checking
3. **Indexing**: Create indexes for all common query patterns
4. **Relationships**: Use proper ID references for data integrity
5. **Search**: Implement search indexes for user-facing search functionality
6. **Timestamps**: Use consistent timestamp formats (numbers for Convex)
7. **Optional Fields**: Use `v.optional()` for nullable fields

This schema provides a solid foundation for the Extrovertly application with proper indexing, search capabilities, and type safety throughout the system.
