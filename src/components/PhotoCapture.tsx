import { useRef, useState } from 'react';
import { useApp } from '../store/AppContext';
import { Attachment } from '../types';
import { v4 as uuid } from 'uuid';

interface PhotoCaptureProps {
  parentId: string;
  parentType: 'job' | 'quote' | 'invoice' | 'customer';
  onCapture?: (attachment: Attachment) => void;
}

export default function PhotoCapture({ parentId, parentType, onCapture }: PhotoCaptureProps) {
  const { attachments, dispatch } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [capturing, setCapturing] = useState(false);

  const existing = attachments.filter(a => a.parentId === parentId && a.parentType === parentType && a.type === 'photo');

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCapturing(true);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Compress if large
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 1200;
        const scale = img.width > maxW ? maxW / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.8);

        const attachment: Attachment = {
          id: uuid(), parentId, parentType, name: file.name,
          type: 'photo', dataUrl: compressed, notes: '',
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_ATTACHMENT', payload: attachment });
        onCapture?.(attachment);
        setCapturing(false);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function removePhoto(id: string) {
    if (confirm('Remove this photo?')) dispatch({ type: 'DELETE_ATTACHMENT', payload: id });
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Photos</h3>

      {/* Photo grid */}
      {existing.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {existing.map(att => (
            <div key={att.id} className="relative group rounded-lg overflow-hidden border border-slate-800">
              <img src={att.dataUrl} alt={att.name} className="w-full aspect-square object-cover" />
              <button onClick={() => removePhoto(att.id)} className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Capture button */}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={capturing}
        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 rounded-lg py-2 text-sm flex items-center justify-center gap-2"
      >
        <span>📷</span>
        <span>{capturing ? 'Processing...' : 'Add Photo'}</span>
      </button>
    </div>
  );
}
