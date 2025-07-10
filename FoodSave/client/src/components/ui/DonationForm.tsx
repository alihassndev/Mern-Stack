import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "./Textarea";
import { useState } from "react";

const donationSchema = z.object({
  foodName: z.string().min(1, "Required"),
  foodType: z.string().min(1, "Required"),
  quantity: z.number().min(1, "Must be at least 1"),
  expiryDate: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  description: z.string().optional(),
  image: z.any().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

export default function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  });

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Donation submitted:", data);
      reset();
      setPreviewImage(null);
      // In a real app, you would show a success notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Food Name"
          error={errors.foodName?.message}
          {...register("foodName")}
        />

        <Select
          label="Food Type"
          options={[
            { value: "fruits", label: "Fruits" },
            { value: "vegetables", label: "Vegetables" },
            { value: "meals", label: "Prepared Meals" },
            { value: "bakery", label: "Bakery Items" },
            { value: "dairy", label: "Dairy Products" },
            { value: "other", label: "Other" },
          ]}
          error={errors.foodType?.message}
          {...register("foodType")}
        />

        <Input
          type="number"
          label="Quantity (servings)"
          error={errors.quantity?.message}
          {...register("quantity", { valueAsNumber: true })}
        />

        <Input
          type="date"
          label="Expiry Date"
          error={errors.expiryDate?.message}
          {...register("expiryDate")}
          min={new Date().toISOString().split("T")[0]}
        />

        <Input
          label="Pickup Location"
          error={errors.location?.message}
          {...register("location")}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Description (optional)"
            error={errors.description?.message}
            {...register("description")}
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Image (optional)
          </label>
          <div className="mt-1 flex items-center">
            <label
              htmlFor="image-upload"
              className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Choose File
            </label>
            <input
              id="image-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <span className="ml-2 text-sm text-gray-500">
              {watch("image")?.[0]?.name || "No file chosen"}
            </span>
          </div>
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Donation"}
        </Button>
      </div>
    </form>
  );
}
