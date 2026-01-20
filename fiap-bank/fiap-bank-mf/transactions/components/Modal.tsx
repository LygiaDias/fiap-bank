import React from "react";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-lg p-6">
        <div className="bg-white rounded-xl p-4 shadow-card">{children}</div>
      </div>
    </div>
  );
}
