import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!evt || hidden) return null;

  return (
    <div role="dialog" aria-label="Installer EduDialect AI" className="fixed bottom-20 inset-x-4 max-w-2xl mx-auto card border-emerald flex items-center justify-between gap-3 z-20">
      <div>
        <p className="font-semibold">Installer EduDialect AI</p>
        <p className="text-xs text-neutral-400">Accès rapide, même avec une connexion faible.</p>
      </div>
      <div className="flex gap-2">
        <button className="btn-ghost py-2 px-3 text-sm" onClick={() => setHidden(true)}>Plus tard</button>
        <button className="btn-primary py-2 px-3 text-sm" onClick={async () => { await evt.prompt(); setHidden(true); }}>Installer</button>
      </div>
    </div>
  );
}
