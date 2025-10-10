import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lessons: defineTable({
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
  }),

  writings: defineTable({
    title: v.string(),
    content: v.string(),
    lessonId: v.id("lessons"),
  }).index("by_lesson", ["lessonId"]),
});
