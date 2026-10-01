import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 left-4 sm:left-auto sm:right-8 z-50 flex items-center gap-3 bg-[#151a23] border border-[#00b4ff] text-[#e8eafe] px-4 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md max-w-md animate-fade-in font-mono text-xs">
      <div className="w-2 h-2 rounded-full bg-[#00b4ff] animate-ping shrink-0" />
      <span className="flex-1 break-words">{message}</span>
      <button
        onClick={onClose}
        className="text-[#87929c] hover:text-[#e1e2eb] ml-2 cursor-pointer"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
