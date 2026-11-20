import { useNavigate } from 'react-router-dom';
import { useProfile } from '../lib/useProfile';
import { GRADES, LANGUAGES, SUBJECTS } from '../data/options';

export default function Selectors() {
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Langue locale</h2>
        {LANGUAGES.map((l) => (
          <button key={l.id} onClick={() => setProfile({ language: l.id })} className={`card w-full text-left ${profile.language === l.id ? 'border-emerald' : ''}`}>
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="font-semibold">{l.name}</p>
                <p className="text-sm text-neutral-400">{l.region}</p>
              </div>
              <span className="text-xs text-orange">{l.note}</span>
            </div>
            <p className="text-emerald text-sm mt-2 italic">« {l.greeting} »</p>
          </button>
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Classe</h2>
        <div className="grid grid-cols-2 gap-3">
          {GRADES.map((g) => (
            <button key={g.id} onClick={() => setProfile({ grade: g.id })} className={`card text-center ${profile.grade === g.id ? 'border-emerald text-emerald' : ''}`}>{g.label}</button>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Matière</h2>
        <div className="grid grid-cols-2 gap-3">
          {SUBJECTS.map((s) => (
            <button key={s.id} onClick={() => setProfile({ subject: s.id })} className={`card text-center ${profile.subject === s.id ? 'border-orange text-orange' : ''}`}>{s.label}</button>
          ))}
        </div>
      </section>
      <button className="btn-primary w-full" onClick={() => navigate('/explore')}>Explorer les notions</button>
    </div>
  );
}
