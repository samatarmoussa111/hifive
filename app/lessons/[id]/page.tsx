import { notFound } from "next/navigation"
import { lessons } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LessonDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const lesson = lessons.find((l) => l.id === params.id)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
      <Link href="/lessons">
        <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Button>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-3">{lesson.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(lesson.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Vocabulary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lesson.words.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-card p-5 transition-colors hover:bg-muted/30"
              >
                <span className="text-lg font-medium text-foreground">{word.frenchword}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-lg font-medium text-foreground">{word.englishword}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
