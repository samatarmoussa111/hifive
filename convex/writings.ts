import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 🧩 Liste les writings d’une leçon spécifique pour l’utilisateur connecté

export const listWritingsByLesson = query({
  args: {
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("writings")
      .withIndex("by_lesson", (q) => q.eq("lessonId", args.lessonId))
      .collect();
  },
});

// ✍️ Créer un nouveau writing
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const writingId = await ctx.db.insert("writings", {
      title: args.title,
      content: args.content,
      lessonId: args.lessonId,
    });
    return writingId;
  },
});

// 📜 Optionnel : lister tous les writings d’un user
{
  /**
    export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("writings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
    */
}
