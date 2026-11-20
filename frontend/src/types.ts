export type Language = 'tem' | 'kabye' | 'ewe';
export type Grade = 'seconde' | 'premiere';
export type Subject = 'physique' | 'chimie';

export interface Profile {
  language: Language;
  grade: Grade;
  subject: Subject;
}

export interface HistoryItem {
  id: string;
  question: string;
  topicId?: string;
  createdAt: string;
}
