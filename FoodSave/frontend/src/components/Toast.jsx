import { useEffect } from "react";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  let bg = "bg-blue-100 text-blue-800";
  if (type === "success") bg = "bg-green-100 text-green-800";
  if (type === "error") bg = "bg-red-100 text-red-700";

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 rounded shadow-lg ${bg} flex items-center gap-4 min-w-[200px]`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 font-bold">
        &times;
      </button>
    </div>
  );
};

export default Toast;
