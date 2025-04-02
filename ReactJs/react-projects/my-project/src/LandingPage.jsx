import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <header className="w-full py-6 px-6 flex justify-end">
        <div className="w-32 h-10 bg-green-200 rounded-lg"></div>
      </header>

      {/* Hero Section */}
      <section className="w-[90vw] md:w-[80vw] mx-auto py-20 text-center">
        <div className="h-12 w-3/4 mx-auto bg-green-200 rounded mb-6"></div>
        <div className="h-6 w-1/2 mx-auto bg-green-100 rounded mb-8"></div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
          <div className="flex-1 h-12 bg-white border border-green-300 rounded-lg"></div>
          <div className="w-24 h-12 bg-green-600 rounded-lg"></div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="w-[90vw] md:w-[80vw] mx-auto py-16">
        <div className="text-center mb-12">
          <div className="h-8 w-48 mx-auto bg-green-200 rounded mb-4"></div>
          <div className="h-4 w-64 mx-auto bg-green-100 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`h-64 ${i === 0 ? 'bg-green-100' : i === 1 ? 'bg-green-200' : 'bg-green-300'} flex items-center justify-center`}>
                <div className="w-32 h-32 rounded-full bg-white/30"></div>
              </div>
              <div className="p-6">
                <div className="h-5 w-3/4 bg-green-100 rounded mb-3"></div>
                <div className="h-4 w-1/3 bg-green-100 rounded mb-4"></div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-green-100 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-12 w-40 mx-auto bg-green-600 rounded-lg mt-12"></div>
      </section>

      {/* CTA Section */}
      <section className="w-[90vw] md:w-[80vw] mx-auto my-20 bg-green-800 rounded-xl p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-8 w-3/4 mx-auto bg-green-200 rounded mb-6"></div>
          <div className="h-4 w-full mx-auto bg-green-200 rounded mb-8"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-10 w-32 bg-white rounded-lg"></div>
            <div className="h-10 w-32 border border-white rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Suppliers Section */}
      <section className="w-[90vw] md:w-[80vw] mx-auto py-16">
        <div className="text-center mb-12">
          <div className="h-8 w-48 mx-auto bg-green-200 rounded mb-4"></div>
          <div className="h-4 w-64 mx-auto bg-green-100 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`h-48 ${i === 0 ? 'bg-green-100' : i === 1 ? 'bg-green-200' : 'bg-green-300'} flex items-center justify-center`}>
                <div className="w-24 h-24 rounded-full bg-white/30"></div>
              </div>
              <div className="p-6 text-center">
                <div className="h-5 w-3/4 mx-auto bg-green-100 rounded mb-3"></div>
                <div className="h-3 w-full mx-auto bg-green-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-[90vw] md:w-[80vw] mx-auto py-20">
        <div className="text-center mb-12">
          <div className="h-8 w-48 mx-auto bg-green-200 rounded mb-4"></div>
          <div className="h-4 w-64 mx-auto bg-green-100 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`p-8 rounded-xl ${i === 1 ? 'bg-green-800' : 'bg-white shadow-sm'}`}>
              <div className="h-4 w-8 bg-green-200 rounded mb-6"></div>
              <div className="h-16 w-full bg-green-100 rounded mb-6"></div>
              <div className="h-4 w-3/4 bg-green-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <div className="w-10 h-10 border border-green-300 rounded-md"></div>
          <div className="w-10 h-10 bg-green-100 rounded-md"></div>
        </div>
      </section>

      {/* Footer */}
      <div className="h-20 w-full bg-green-800"></div>
    </div>
  );
}