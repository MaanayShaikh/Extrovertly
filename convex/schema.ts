import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. Users table
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
    .index("by_email", ["email"])
    .index("by_username", ["username"])
    .index("by_confidence_level", ["confidenceLevel"]),

  // 2. User Profiles table
  userProfiles: defineTable({
    userId: v.id("users"),
    bio: v.optional(v.string()),
    socialGoals: v.optional(v.array(v.string())),
    comfortLevels: v.optional(v.any()), // JSONB equivalent
    interests: v.optional(v.array(v.string())),
    socialContexts: v.optional(v.any()), // JSONB equivalent
  })
    .index("by_user_id", ["userId"]),

  // 3. Journal Entries table
  journalEntries: defineTable({
    userId: v.id("users"),
    content: v.string(),
    mood: v.string(),
    reflectionPrompt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPrivate: v.boolean(),
    wordCount: v.optional(v.number()),
  })
    .index("by_user_id", ["userId"])
    .index("by_mood", ["mood"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["userId", "mood"],
    }),

  // 4. Missions table
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
    .index("by_difficulty", ["difficulty"])
    .index("by_category", ["category"])
    .index("by_difficulty_category", ["difficulty", "category"])
    .searchIndex("search_missions", {
      searchField: "title",
      filterFields: ["difficulty", "category"],
    }),

  // 5. User Missions table
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
    .index("by_user_id", ["userId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_mission_id", ["missionId"])
    .index("by_user_mission", ["userId", "missionId"]),

  // 6. Events table
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
    .index("by_date", ["date"])
    .index("by_category", ["category"])
    .index("by_comfort_level", ["comfortLevel"])
    .index("by_organizer", ["organizerId"])
    .index("by_date_category", ["date", "category"])
    .searchIndex("search_events", {
      searchField: "title",
      filterFields: ["category", "comfortLevel", "date"],
    }),

  // 7. Event Attendees table
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
    .index("by_event_id", ["eventId"])
    .index("by_user_id", ["userId"])
    .index("by_event_status", ["eventId", "status"])
    .index("by_user_status", ["userId", "status"]),

  // 8. Achievements table
  achievements: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.optional(v.string()),
    requirements: v.any(), // JSONB equivalent
    pointsReward: v.number(),
    isActive: v.boolean(),
  })
    .index("by_category", ["category"])
    .index("by_points", ["pointsReward"]),

  // 9. User Achievements table
  userAchievements: defineTable({
    userId: v.id("users"),
    achievementId: v.id("achievements"),
    earnedAt: v.number(), // timestamp
    progress: v.number(),
    maxProgress: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_achievement_id", ["achievementId"])
    .index("by_user_achievement", ["userId", "achievementId"]),

  // 10. Coach Conversations table
  coachConversations: defineTable({
    userId: v.id("users"),
    sessionId: v.string(),
    endedAt: v.optional(v.number()), // timestamp
    sessionSummary: v.optional(v.string()),
  })
    .index("by_user_id", ["userId"])
    .index("by_session_id", ["sessionId"])
    .index("by_user_session", ["userId", "sessionId"]),

  // 11. Coach Messages table
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
    .index("by_conversation_id", ["conversationId"])
    .index("by_sender", ["sender"]),

  // 12. Progress Tracking table
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
    .index("by_user_id", ["userId"])
    .index("by_user_date", ["userId", "trackingDate"])
    .index("by_date", ["trackingDate"]),

  // 13. Weekly Insights table
  weeklyInsights: defineTable({
    userId: v.id("users"),
    weekStartDate: v.string(), // ISO date string
    insightType: v.string(),
    title: v.string(),
    description: v.string(),
    data: v.optional(v.any()), // JSONB equivalent
    isRead: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_week", ["userId", "weekStartDate"])
    .index("by_insight_type", ["insightType"]),

  // 14. Mood Tracking table
  moodTracking: defineTable({
    userId: v.id("users"),
    mood: v.string(),
    intensity: v.optional(v.number()), // 1-10
    context: v.optional(v.string()),
    triggers: v.optional(v.array(v.string())),
  })
    .index("by_user_id", ["userId"])
    .index("by_mood", ["mood"]),

  // 15. Social Goals table
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
    .index("by_user_id", ["userId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_category", ["category"])
    .searchIndex("search_goals", {
      searchField: "title",
      filterFields: ["userId", "status", "category"],
    }),
});
