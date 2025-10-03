import Link from "next/link"
import { lessons } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BookOpen } from "lucide-react"

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-3">Your Lessons</h1>
        <p className="text-lg text-muted-foreground text-pretty">Browse your vocabulary lessons and start learning</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="h-5 w-5 text-foreground" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(lesson.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <p className="text-sm text-muted-foreground">{lesson.words.length} words</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
