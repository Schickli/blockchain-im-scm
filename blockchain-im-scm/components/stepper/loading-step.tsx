interface LoadingStepProps {
  title: string;
  description: string;
}

export default function LoadingStep({ title, description }: LoadingStepProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-20">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-opacity duration-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-200 opacity-90"></div>
    </div>
  );
}