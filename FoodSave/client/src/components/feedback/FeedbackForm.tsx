import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "../ui/Rating";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Required"),
  comment: z.string().optional(),
  foodQuality: z.number().min(1, "Required"),
  donorService: z.number().min(1, "Required"),
});

export default function FeedbackForm() {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  return (
    <form className="space-y-4">
      <div>
        <label>Overall Rating</label>
        <Rating name="rating" control={control} />
      </div>

      <div>
        <label>Food Quality</label>
        <Rating name="foodQuality" control={control} />
      </div>

      <div>
        <label>Donor Service</label>
        <Rating name="donorService" control={control} />
      </div>

      <Textarea label="Additional Comments" {...register("comment")} />

      <Button type="submit">Submit Feedback</Button>
    </form>
  );
}
