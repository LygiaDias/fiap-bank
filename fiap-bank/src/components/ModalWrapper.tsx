export default function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-xl p-4 shadow-card">{children}</div>
      </div>
    </div>
  );
}
