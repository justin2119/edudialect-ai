import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-dvh flex flex-col justify-between max-w-2xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center">
        <span className="font-display font-bold">EduDialect<span className="text-emerald">.</span>AI</span>
        <Link to="/onboarding" className="text-sm text-neutral-400 hover:text-white">Passer</Link>
      </div>
      <div className="space-y-6">
        <p className="text-orange text-sm font-semibold uppercase tracking-widest">Sokodé · Togo</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Comprendre les sciences sans barrière</h1>
        <p className="text-xl text-emerald font-semibold">Le savoir scientifique dans votre langue</p>
        <p className="text-neutral-300 leading-relaxed">
          Au Togo, les cours de sciences se font en français. EduDialect AI aide les élèves de Seconde et Première
          à comprendre la physique et la chimie en français simple, avec des exemples du quotidien, et en Tem, Kabyè
          ou Ewe lorsque la notion reste difficile.
        </p>
      </div>
      <Link to="/onboarding" className="btn-primary w-full text-center">Continuer</Link>
    </div>
  );
}
