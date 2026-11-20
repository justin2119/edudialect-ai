import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { markOnboardingDone } from '../lib/storage';

const SLIDES = [
  {
    kicker: 'Comment ça marche',
    title: 'Posez votre question en 4 étapes',
    body: '1. Écrivez ou dictez votre question. 2. Lisez l’explication en français simple. 3. Écoutez la clarification dans votre langue. 4. Retenez la formule et l’exemple du quotidien.',
  },
  {
    kicker: 'Vos langues',
    title: 'Tem, Kabyè, Ewe',
    body: 'Choisissez votre langue locale. EduDialect AI reprend les notions clés avec des mots de votre communauté, sans remplacer le cours en français.',
  },
  {
    kicker: 'Sokodé, hors connexion',
    title: 'Installez l’application',
    body: 'EduDialect AI est une application web installable. Une fois ajoutée à votre écran d’accueil, elle reste utilisable avec une connexion faible.',
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[index];
  const last = index === SLIDES.length - 1;

  const finish = () => {
    markOnboardingDone();
    navigate('/selectors');
  };

  return (
    <div className="min-h-dvh flex flex-col max-w-2xl mx-auto px-6 py-10 justify-between">
      <div className="flex gap-2">
        {SLIDES.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded ${i <= index ? 'bg-emerald' : 'bg-line'}`} />
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-orange text-sm font-semibold uppercase tracking-widest">{slide.kicker}</p>
        <h2 className="text-3xl font-bold">{slide.title}</h2>
        <p className="text-neutral-300 leading-relaxed">{slide.body}</p>
      </div>
      <div className="flex gap-3">
        {index > 0 && (
          <button className="btn-ghost flex-1" onClick={() => setIndex(index - 1)}>Retour</button>
        )}
        {last ? (
          <button className="btn-primary flex-1" onClick={finish}>Commencer</button>
        ) : (
          <button className="btn-primary flex-1" onClick={() => setIndex(index + 1)}>Suivant</button>
        )}
      </div>
    </div>
  );
}
