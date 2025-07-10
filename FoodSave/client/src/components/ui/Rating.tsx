import { Controller } from "react-hook-form";
import { Star } from "lucide-react";

interface RatingProps {
  name: string;
  control: any;
  max?: number;
}

export function Rating({ name, control, max = 5 }: RatingProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex">
          {[...Array(max)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => field.onChange(i + 1)}
              className="text-gray-300 hover:text-yellow-400 focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  i < field.value ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </button>
          ))}
        </div>
      )}
    />
  );
}
