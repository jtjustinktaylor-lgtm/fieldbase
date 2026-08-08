import { useApp } from '../store/AppContext';

export default function OfflineIndicator() {
  const { online } = useApp();

  if (online) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-900/95 text-amber-100 text-center py-2 px-4 text-sm font-medium backdrop-blur">
      <div className="flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>You're offline — changes will sync when reconnected</span>
      </div>
    </div>
  );
}
