import type { ChangeHandler, RefCallBack } from "react-hook-form";

interface InputProps {
  label: string;
  error?: string;
  name: string;
  type?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  // Other input props
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
