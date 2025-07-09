import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const donationSchema = z.object({
  foodType: z.string().min(1, "Required"),
  quantity: z.number().min(1, "Must be at least 1"),
  expiryDate: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
});

type DonationFormData = z.infer<typeof donationSchema>;

export default function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  });

  const onSubmit = (data: DonationFormData) => {
    console.log("Donation submitted:", data);
    // Will connect to API later
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Food Type"
        options={[
          { value: "fruits", label: "Fruits" },
          { value: "vegetables", label: "Vegetables" },
          { value: "meals", label: "Prepared Meals" },
          { value: "bakery", label: "Bakery Items" },
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
      />

      <Input
        label="Pickup Location"
        error={errors.location?.message}
        {...register("location")}
      />

      <Button type="submit" className="w-full">
        Submit Donation
      </Button>
    </form>
  );
}
