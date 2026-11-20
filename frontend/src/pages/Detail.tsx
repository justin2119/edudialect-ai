import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Pause, Play, ArrowLeft } from 'lucide-react';
import { findTopic, matchTopic, type Topic } from '../data/topics';
import { LANGUAGES } from '../data/options';
import { askBackend, isApiConfigured } from '../lib/api';
import { speak } from '../lib/speech';
import { useProfile } from '../lib/useProfile';

export default function Detail() {
  const { topicId } = useParams();
  const location = useLocation();
  const question = (location.state as { question?: string } | null)?.question ?? '';
  const { profile } = useProfile();
  const topic: Topic | undefined = findTopic(topicId ?? '') ?? matchTopic(question);
  const [simple, setSimple] = useState(true);
  const [useApi, setUseApi] = useState(false);
  const [apiText, setApiText] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stopAudio, setStopAudio] = useState<(() => void) | null>(null);

  const lang = LANGUAGES.find((l) => l.id === profile.language)!;

  useEffect(() => {
    if (!useApi || !isApiConfigured()) return;
    askBackend({ question, language: profile.language, grade: profile.grade, subject: profile.subject })
      .then((a) => { setApiText(a.explanation); setApiError(null); })
      .catch((e: Error) => setApiError(`${e.message}. Affichage de la base locale.`));
  }, [useApi, question, profile.language, profile.grade, profile.subject]);

  useEffect(() => () => stopAudio?.(), [stopAudio]);

  if (!topic) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Notion non reconnue</h1>
        <p className="text-neutral-300">Cette question n’est pas encore dans la base locale de notions. Essayez une notion comme la loi d’Ohm ou l’oxydoréduction.</p>
        <Link to="/explore" className="btn-primary inline-block">Retour à l’exploration</Link>
      </div>
    );
  }

  const dialectText = topic.dialect[profile.language];
  const speakText = simple ? topic.simplified : topic.reformulation;

  const togglePlay = () => {
    if (playing && stopAudio) {
      stopAudio();
      setPlaying(false);
      return;
    }
    setProgress(0);
    const cancel = speak(`${topic.phonetic}. ${speakText}`, () => { setPlaying(false); setProgress(100); });
    if (cancel) { setPlaying(true); setStopAudio(() => cancel); }
  };

  return (
    <article className="space-y-6">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-neutral-400"><ArrowLeft size={16} /> Retour</Link>
      <header className="space-y-2">
        <p className="text-orange text-xs uppercase tracking-widest">{topic.subject} · {profile.grade === 'seconde' ? 'Seconde' : 'Première'}</p>
        <h1 className="text-3xl font-bold">{topic.title}</h1>
        {question && <p className="text-neutral-400 text-sm">Votre question : « {question} »</p>}
      </header>

      <section className="card space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Explication</h2>
          <button onClick={() => setSimple(!simple)} className="pill border-emerald/40 text-emerald">{simple ? 'Version détaillée' : 'Simplifier'}</button>
        </div>
        <p className="text-neutral-200 leading-relaxed">{simple ? topic.simplified : topic.reformulation}</p>
      </section>

      <section className="card space-y-2">
        <h2 className="font-semibold">Clarification en {lang.name}</h2>
        <p className="text-emerald italic">{dialectText}</p>
        <p className="text-xs text-neutral-500">Traduction indicative, à vérifier avec votre enseignant.</p>
      </section>

      <section className="card space-y-2">
        <h2 className="font-semibold">Exemple du quotidien</h2>
        <p className="text-neutral-200 leading-relaxed">{topic.example}</p>
      </section>

      <section className="card space-y-3">
        <h2 className="font-semibold">Formule et unités</h2>
        <p className="font-mono text-2xl text-emerald">{topic.formula}</p>
        <ul className="text-sm text-neutral-300 list-disc pl-5 space-y-1">
          {topic.units.map((u) => <li key={u}>{u}</li>)}
        </ul>
      </section>

      <section className="card space-y-3">
        <h2 className="font-semibold">Écouter</h2>
        <div className="flex items-center gap-4">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Lecture'} className="btn-primary p-3 rounded-full">
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-1 h-2 bg-line rounded overflow-hidden">
            <div className="h-full bg-emerald transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <p className="text-xs text-neutral-500">Lecture française avec prononciation simplifiée : « {topic.phonetic} ».</p>
      </section>

      <section className="card space-y-3">
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Demander au serveur RodiumAI</span>
          <input type="checkbox" checked={useApi} onChange={(e) => setUseApi(e.target.checked)} disabled={!isApiConfigured()} className="accent-emerald h-4 w-4" />
        </label>
        {!isApiConfigured() && <p className="text-xs text-neutral-500">Serveur non configuré : la base locale est utilisée.</p>}
        {apiText && <p className="text-neutral-200 text-sm">{apiText}</p>}
        {apiError && <p className="text-orange text-sm">{apiError}</p>}
      </section>
    </article>
  );
}
