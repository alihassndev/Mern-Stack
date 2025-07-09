import type { ChangeHandler, RefCallBack } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  error?: string;
  name: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  // Add any other input props you need
}

export function Select({ label, options, error, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
