
export enum Category {
  AIR_LAW = "Prawo Lotnicze",
  HUMAN_PERFORMANCE = "Człowiek - możliwości i ograniczenia",
  METEOROLOGY = "Meteorologia",
  COMMUNICATIONS = "Łączność",
  PRINCIPLES_OF_FLIGHT = "Zasady lotu",
  OPERATIONAL_PROCEDURES = "Procedury operacyjne",
  FLIGHT_PERFORMANCE = "Osiągi i planowanie lotu",
  AIRCRAFT_KNOWLEDGE = "Ogólna wiedza o statku powietrznym",
  NAVIGATION = "Nawigacja"
}

export type Language = 'PL' | 'EN';

export interface Question {
  id: string;
  category: Category;
  text: string;
  imageUrl?: string; // URL do obrazka (opcjonalny)
  options: string[];
  correctAnswerIndex: number; // 0-3
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface ExamResult {
  id: string;
  user: User;
  date: string; // ISO string
  score: number; // 0-20
  passed: boolean;
  answers: AnswerRecord[];
  totalQuestions: number;
}

// App State Views
export type AppView = 'WELCOME' | 'EXAM' | 'RESULT' | 'ADMIN';
