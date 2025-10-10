import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ➕ Créer une nouvelle leçon
export const createLesson = mutation({
  args: {
    title: v.string(),
    words: v.array(
      v.object({
        frenchword: v.string(),
        englishword: v.string(),
        examples: v.array(
          v.object({
            french: v.string(),
            english: v.string(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lessons", args);
  },
});

// 🔄 Mettre à jour une leçon
export const updateLesson = mutation({
  args: {
    id: v.id("lessons"),
    title: v.optional(v.string()),
    words: v.optional(
      v.array(
        v.object({
          frenchword: v.string(),
          englishword: v.string(),
          examples: v.array(
            v.object({
              french: v.string(),
              english: v.string(),
            })
          ),
        })
      )
    ),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
    return id;
  },
});

// ❌ Supprimer une leçon
export const deleteLesson = mutation({
  args: { id: v.id("lessons") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

// 📚 Lister toutes les leçons
export const listLessons = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lessons").order("desc").collect();
  },
});

// 🔍 Obtenir une leçon par ID
export const getLesson = query({
  args: { id: v.id("lessons") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
