export default function Loader({ size = "default", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Main spinner */}
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
        ></div>

        {/* Pulsing ring effect */}
        <div
          className={`${sizeClasses[size]} absolute inset-0 animate-ping rounded-full border-2 border-blue-400 opacity-20`}
        ></div>
      </div>

      {text && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}

// Full screen loader variant
export function FullScreenLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <div className="w-16 h-16 absolute inset-0 animate-ping rounded-full border-2 border-blue-400 opacity-20"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium animate-pulse">{text}</p>
      </div>
    </div>
  );
}

// Skeleton loader for content
export function SkeletonLoader({ lines = 3, className = "" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded mb-3 ${
            index === lines - 1 ? "w-3/4" : "w-full"
          }`}
        ></div>
      ))}
    </div>
  );
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}
