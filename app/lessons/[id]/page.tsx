"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: Id<"lessons"> }>;
}) {
  const { id } = use(params);

  const lesson = useQuery(api.lessons.getLesson, { id });

  if (lesson === undefined || lesson === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
      <Link href="/lessons">
        <Button
          variant="ghost"
          className="mb-12 -ml-4 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-2">
          {lesson.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {lesson.words.length} {lesson.words.length === 1 ? "word" : "words"}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="multiple" className="w-full">
          {lesson.words.map((word, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-border/30"
            >
              <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                {word.frenchword}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pb-6">
                {word.englishword}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
