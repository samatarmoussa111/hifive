import type React from "react";

import { useState } from "react";
import type { Lesson } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface TestModalProps {
  lesson: Lesson;
  onClose: () => void;
}

// TestModal is now a regular component, not a "use client" component
export function TestModal({ lesson, onClose }: TestModalProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const currentWord = lesson.words[currentWordIndex];
  const isLastWord = currentWordIndex === lesson.words.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct =
      userAnswer.trim().toLowerCase() === currentWord.englishword.toLowerCase();
    setIsCorrect(correct);
    setShowCorrection(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastWord) {
      setTestCompleted(true);
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserAnswer("");
      setShowCorrection(false);
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    setUserAnswer("");
    setShowCorrection(false);
    setIsCorrect(false);
    setScore(0);
    setTestCompleted(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {lesson.title}
          </DialogTitle>
        </DialogHeader>

        {testCompleted ? (
          <div className="space-y-8 py-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Trophy className="h-20 w-20 text-foreground" />
              <div>
                <h3 className="text-3xl font-bold mb-3">Test Complete</h3>
                <p className="text-xl text-muted-foreground">
                  Your score: {score} / {lesson.words.length}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Try Again
              </Button>
              <Button onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 py-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Word {currentWordIndex + 1} of {lesson.words.length}
              </p>
              <div className="text-5xl font-bold text-foreground">
                {currentWord.frenchword}
              </div>
              <p className="text-base text-muted-foreground">
                Translate to English
              </p>
            </div>

            {!showCorrection ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-center text-lg h-12"
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={!userAnswer.trim()}
                >
                  Check Answer
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div
                  className={`rounded-lg border-2 p-6 text-center ${
                    isCorrect
                      ? "border-green-600 bg-green-50"
                      : "border-red-600 bg-red-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <span className="text-lg font-semibold text-green-600">
                          Correct
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-red-600" />
                        <span className="text-lg font-semibold text-red-600">
                          Incorrect
                        </span>
                      </>
                    )}
                  </div>
                  {!isCorrect && (
                    <div className="text-base space-y-2">
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Your answer
                        </p>
                        <p className="font-semibold text-red-600">
                          {userAnswer}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Correct answer
                        </p>
                        <p className="font-semibold text-green-600">
                          {currentWord.englishword}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Button onClick={handleNext} className="w-full h-12">
                  {isLastWord ? "Finish" : "Next Word"}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
