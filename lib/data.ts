export interface Word {
  frenchword: string
  englishword: string
}

export interface Lesson {
  id: string
  title: string
  date: string
  words: Word[]
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Animals",
    date: "2025-09-29",
    words: [
      { frenchword: "chien", englishword: "dog" },
      { frenchword: "chat", englishword: "cat" },
      { frenchword: "oiseau", englishword: "bird" },
      { frenchword: "poisson", englishword: "fish" },
      { frenchword: "cheval", englishword: "horse" },
    ],
  },
  {
    id: "2",
    title: "House",
    date: "2025-09-28",
    words: [
      { frenchword: "porte", englishword: "door" },
      { frenchword: "fenêtre", englishword: "window" },
      { frenchword: "table", englishword: "table" },
      { frenchword: "chaise", englishword: "chair" },
      { frenchword: "lit", englishword: "bed" },
    ],
  },
  {
    id: "3",
    title: "Food",
    date: "2025-09-27",
    words: [
      { frenchword: "pain", englishword: "bread" },
      { frenchword: "eau", englishword: "water" },
      { frenchword: "fromage", englishword: "cheese" },
      { frenchword: "pomme", englishword: "apple" },
      { frenchword: "viande", englishword: "meat" },
    ],
  },
  {
    id: "4",
    title: "Colors",
    date: "2025-09-26",
    words: [
      { frenchword: "rouge", englishword: "red" },
      { frenchword: "bleu", englishword: "blue" },
      { frenchword: "vert", englishword: "green" },
      { frenchword: "jaune", englishword: "yellow" },
      { frenchword: "noir", englishword: "black" },
    ],
  },
]
