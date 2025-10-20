"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Id } from "@/convex/_generated/dataModel";
import MarkdownEditor from "./markdown-editor";

// ✅ Validation schema avec Zod
const writingSchema = z.object({
  title: z.string().min(2, "Le titre doit comporter au moins 2 caractères"),
  content: z
    .string()
    .min(10, "Le contenu doit comporter au moins 10 caractères"),
});

interface CreateWritingModalProps {
  lessonId: Id<"lessons">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWritingModal({
  lessonId,
  open,
  onOpenChange,
}: CreateWritingModalProps) {
  const createWriting = useMutation(api.writings.create);

  const form = useForm<z.infer<typeof writingSchema>>({
    resolver: zodResolver(writingSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof writingSchema>) => {
    try {
      await createWriting({
        title: values.title,
        content: values.content,
        lessonId,
      });
      form.reset();
      onOpenChange(false);
    } catch (err) {
      console.error("Erreur création writing:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Writing
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                Save Writing
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
