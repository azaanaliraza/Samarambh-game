import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Store/Init User
export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (user) return user._id;

    return await ctx.db.insert("users", {
      name: identity.name || "Anonymous",
      username: identity.nickname || identity.email!.split("@")[0],
      clerkId: identity.subject,
      score: 0,
      solvedChallenges: [],
      lastSolvedAt: Date.now(),
    });
  },
});

// 2. Get Leaderboard (Sorted by Score DESC, then Time ASC)
export const getLeaderboard = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    
    // Sort in memory (Convex sort is limited without complex indexes)
    // 1. Higher score is better
    // 2. Lower (earlier) timestamp is better
    return users.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; 
      }
      return a.lastSolvedAt - b.lastSolvedAt; 
    }).slice(0, 10);
  },
});

// 3. Submit Correct Answer
export const submitSolve = mutation({
  args: { 
    challengeId: v.number(), 
    points: v.number() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Check if already solved to prevent double points
    if (user.solvedChallenges?.includes(args.challengeId)) {
      return; 
    }

    // Update User
    const newSolved = [...(user.solvedChallenges || []), args.challengeId];
    
    await ctx.db.patch(user._id, { 
      score: user.score + args.points,
      solvedChallenges: newSolved,
      lastSolvedAt: Date.now() // Update timestamp for speed ranking
    });
  },
});

// 4. Get Current User's Progress (to lock buttons)
export const getUserProgress = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    return user ? user.solvedChallenges : [];
  },
});