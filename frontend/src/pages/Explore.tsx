import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Search, Clock } from 'lucide-react';
import { TOPICS, matchTopic } from '../data/topics';
import { addHistory, loadHistory } from '../lib/storage';
import { canRecognize, startRecognition } from '../lib/speech';
import { useProfile } from '../lib/useProfile';
import type { HistoryItem } from '../types';

export default function Explore() {
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);
  const [stop, setStop] = useState<(() => void) | null>(null);
  const { profile } = useProfile();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter((t) => t.subject === profile.subject || !q)
      .filter((t) => !q || t.title.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)) || t.formula.toLowerCase().includes(q));
  }, [query, profile.subject]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const topic = matchTopic(q);
    const item: HistoryItem = { id: crypto.randomUUID(), question: q, topicId: topic?.id, createdAt: new Date().toISOString() };
    setHistory(addHistory(item));
    if (topic) navigate(`/explore/${topic.id}`, { state: { question: q } });
    else navigate('/explore/none', { state: { question: q } });
  };

  const toggleMic = () => {
    if (listening && stop) {
      stop();
      return;
    }
    const cancel = startRecognition(
      'fr-FR',
      (text) => { setQuery(text); ask(text); },
      () => { setListening(false); setStop(null); },
    );
    if (cancel) { setListening(true); setStop(() => cancel); }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Posez votre question</h1>
        <form onSubmit={(e) => { e.preventDefault(); ask(query); }} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : loi d’Ohm, oxydation, pH…"
            className="flex-1 bg-panel border border-line rounded-xl px-4 py-3 outline-none focus:border-emerald"
          />
          {canRecognize() && (
            <button type="button" onClick={toggleMic} aria-label="Dicter" className={`rounded-xl px-4 ${listening ? 'bg-orange text-ink' : 'bg-panel border border-line'}`}>
              <Mic size={20} />
            </button>
          )}
          <button type="submit" aria-label="Chercher" className="btn-primary px-4"><Search size={20} /></button>
        </form>
        {listening && <p className="text-sm text-orange">Je vous écoute…</p>}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Notions clés</h2>
        <div className="grid gap-3">
          {filtered.map((t) => (
            <Link key={t.id} to={`/explore/${t.id}`} className="card block">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{t.title}</span>
                <span className="text-xs uppercase text-neutral-400">{t.subject}</span>
              </div>
              <p className="font-mono text-emerald mt-2">{t.formula}</p>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-neutral-400">Aucune notion trouvée pour cette recherche.</p>}
        </div>
      </section>

      {history.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Clock size={18} /> Questions récentes</h2>
          <ul className="space-y-2">
            {history.slice(0, 5).map((h) => (
              <li key={h.id}>
                <button onClick={() => ask(h.question)} className="card w-full text-left text-sm">{h.question}</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
