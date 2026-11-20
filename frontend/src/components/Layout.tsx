import { NavLink, Outlet } from 'react-router-dom';
import { Compass, UserRound } from 'lucide-react';
import { useProfile } from '../lib/useProfile';
import { GRADES, LANGUAGES, SUBJECTS } from '../data/options';

export default function Layout() {
  const { profile } = useProfile();
  const lang = LANGUAGES.find((l) => l.id === profile.language)!;
  const grade = GRADES.find((g) => g.id === profile.grade)!;
  const subject = SUBJECTS.find((s) => s.id === profile.subject)!;

  return (
    <div className="min-h-dvh flex flex-col max-w-2xl mx-auto">
      <header className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-line px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display font-bold text-lg">EduDialect<span className="text-emerald">.</span>AI</span>
          <div className="flex flex-wrap gap-2 justify-end text-xs">
            <NavLink to="/selectors" className="pill border-emerald/40 text-emerald">{lang.name.split(' ')[0]}</NavLink>
            <NavLink to="/selectors" className="pill border-navy text-blue-300">{grade.label}</NavLink>
            <NavLink to="/selectors" className="pill border-orange/40 text-orange">{subject.label}</NavLink>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-5 pb-24">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 mx-auto max-w-2xl bg-panel border-t border-line grid grid-cols-2">
        <NavLink to="/explore" className={({ isActive }) => `nav-item ${isActive ? 'text-emerald' : 'text-neutral-400'}`}>
          <Compass size={20} /> Explorer
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'text-emerald' : 'text-neutral-400'}`}>
          <UserRound size={20} /> Profil
        </NavLink>
      </nav>
    </div>
  );
}
