export interface Word {
  frenchword: string;
  englishword: string;
}

export interface Lesson {
  _id: string;
  title: string;
  words: Word[];
}
