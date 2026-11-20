import { useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { clearHistory, loadHistory } from '../lib/storage';
import { useProfile } from '../lib/useProfile';
import { GRADES, LANGUAGES, SUBJECTS } from '../data/options';

export default function Profile() {
  const { profile, setProfile } = useProfile();
  const [history, setHistory] = useState(loadHistory);
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const lang = LANGUAGES.find((l) => l.id === profile.language)!;
  const grade = GRADES.find((g) => g.id === profile.grade)!;
  const subject = SUBJECTS.find((s) => s.id === profile.subject)!;

  return (
    <div className="space-y-8">
      <section className="card space-y-2">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <p className="text-neutral-300 text-sm">{lang.name} · {grade.label} · {subject.label}</p>
        <div className="flex items-center gap-2 text-sm">
          {online ? <Wifi size={16} className="text-emerald" /> : <WifiOff size={16} className="text-orange" />}
          {online ? 'Connecté' : 'Hors connexion : les notions locales restent disponibles.'}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Préférences</h2>
        <label className="block text-sm">
          Langue locale
          <select value={profile.language} onChange={(e) => setProfile({ language: e.target.value as typeof profile.language })} className="select">
            {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          Classe
          <select value={profile.grade} onChange={(e) => setProfile({ grade: e.target.value as typeof profile.grade })} className="select">
            {GRADES.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          Matière
          <select value={profile.subject} onChange={(e) => setProfile({ subject: e.target.value as typeof profile.subject })} className="select">
            {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </section>

      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Questions passées</h2>
          {history.length > 0 && (
            <button onClick={() => { clearHistory(); setHistory([]); }} className="text-sm text-orange">Effacer</button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="text-neutral-400 text-sm">Aucune question pour le moment.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id} className="card text-sm">
                <p>{h.question}</p>
                <p className="text-xs text-neutral-500 mt-1">{new Date(h.createdAt).toLocaleString('fr-FR')}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
