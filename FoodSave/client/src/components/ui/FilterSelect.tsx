interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterSelect({ options, value, onChange }: FilterSelectProps) {
  return (
    <select
      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
