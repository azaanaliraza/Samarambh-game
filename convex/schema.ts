import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string(),
    clerkId: v.string(),
    score: v.number(),
    // Track exactly which challenges are solved (array of challenge IDs)
    solvedChallenges: v.array(v.number()), 
    // Timestamp of the last correct answer (for tie-breaking speed)
    lastSolvedAt: v.number(),
  })
  .index("by_clerk_id", ["clerkId"])
  .index("by_score", ["score"]), // Faster leaderboard sorting
});