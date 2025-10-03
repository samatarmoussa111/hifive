import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-6 md:px-12 lg:px-16">
        <Link href="/lessons" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-foreground" />
          <span className="text-lg font-semibold text-foreground">MindMemoEnglish</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/lessons"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Lessons
          </Link>
          <Link
            href="/test"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Test
          </Link>
        </nav>
      </div>
    </header>
  )
}
