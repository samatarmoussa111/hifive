"use client"

import { useState } from "react"
import { lessons } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { TestModal } from "@/components/test-modal"

export default function TestPage() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId)

  return (
    <>
      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-3">Test Your Knowledge</h1>
          <p className="text-lg text-muted-foreground text-pretty">Select a lesson to start practicing</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <button key={lesson.id} onClick={() => setSelectedLessonId(lesson.id)} className="text-left">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-foreground" />
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{lesson.words.length} words to practice</p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {selectedLesson && <TestModal lesson={selectedLesson} onClose={() => setSelectedLessonId(null)} />}
    </>
  )
}
