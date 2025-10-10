"use client";

import { ArrowLeft, Plus } from "lucide-react";
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
import { use, useState } from "react";
import { CreateWritingModal } from "@/components/create-writing-modal";
import { Spinner } from "@/components/spinner";
export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: Id<"lessons"> }>;
}) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lesson = useQuery(api.lessons.getLesson, { id });
  const lessonWritings = useQuery(api.writings.listWritingsByLesson, {
    lessonId: id,
  });

  if (lesson === undefined || lesson === null) {
    return <Spinner />;
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
              <AccordionContent className="pb-8 space-y-6">
                <div className="text-xl font-bold tracking-tight">
                  {word.englishword}
                </div>

                <div className="space-y-4">
                  {word.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="space-y-1.5 pl-4 border-l-2 border-border/50"
                    >
                      <p className="text-base font-medium text-foreground leading-relaxed">
                        {example.english}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {example.french}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/**
       *
       * writings section
       */}
      <div className="max-w-2xl mx-auto mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">My Writings</h2>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Writing
          </Button>
        </div>

        {!lessonWritings ? (
          <Spinner />
        ) : lessonWritings.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No writings yet. Create your first writing!
          </p>
        ) : (
          <Accordion type="multiple" className="w-full">
            {lessonWritings.map((writing) => (
              <AccordionItem
                key={writing._id}
                value={writing._id}
                className="border-b border-border/30"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                  {writing.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">
                  {writing.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <CreateWritingModal
        lessonId={id}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
