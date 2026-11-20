import type { Grade, Language, Subject } from '../types';

export const LANGUAGES: { id: Language; name: string; region: string; greeting: string; note: string }[] = [
  { id: 'tem', name: 'Tem (Kotokoli)', region: 'Sokodé & Région Centrale', greeting: 'Tchayou na maada', note: 'Par défaut à Sokodé' },
  { id: 'kabye', name: 'Kabyè', region: 'Région de la Kara & Centrale', greeting: 'Awia dezi', note: 'Courant en classe' },
  { id: 'ewe', name: 'Ewe (Mina)', region: 'Région Maritime & Plateaux', greeting: 'Grand bassin Sud', note: 'Grand bassin Sud' },
];

export const GRADES: { id: Grade; label: string }[] = [
  { id: 'seconde', label: 'Seconde' },
  { id: 'premiere', label: 'Première' },
];

export const SUBJECTS: { id: Subject; label: string }[] = [
  { id: 'physique', label: 'Physique' },
  { id: 'chimie', label: 'Chimie' },
];
