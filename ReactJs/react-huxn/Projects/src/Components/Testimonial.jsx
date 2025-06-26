import React, { useState } from "react";

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const testimonial = [
    {
      quote:
        "This product completely changed the way we work. Super intuitive and reliable.",
      author: "Sarah Lee, Product Manager",
    },
    {
      quote:
        "Fast, flexible, and incredibly powerful. I can't imagine my workflow without it.",
      author: "James Cole, Developer",
    },
    {
      quote:
        "Excellent customer service and attention to detail. Highly recommended.",
      author: "Nina Alvarez, UX Designer",
    },
    {
      quote:
        "A beautiful blend of simplicity and function. Absolute game-changer.",
      author: "Tom Richards, Startup Founder",
    },
    {
      quote: "We saw results within the first week. Amazing experience!",
      author: "Priya Patel, Marketing Lead",
    },
    {
      quote: "Easy to set up and even easier to use. Five stars from our team.",
      author: "Daniel Kim, Team Lead",
    },
    {
      quote: "Affordable, scalable, and dependable. Just what we needed.",
      author: "Lina Morgan, CTO",
    },
  ];

  const handlePrev = () => {
    setIndex((index + testimonial.length - 1) % testimonial.length);
  };

  const handleNext = () => {
    setIndex((index + 1) % testimonial.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Testimonials</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl text-center transition-all duration-300">
        <p className="text-lg italic text-gray-600 mb-4">
          “{testimonial[index].quote}”
        </p>
        <p className="text-gray-800 font-semibold">
          — {testimonial[index].author}
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
