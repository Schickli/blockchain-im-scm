interface ErrorStepProps {
  title: string;
  description: string;
}

export default function ErrorStep({ title, description }: ErrorStepProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-red-200 to-rose-300">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-20">
        <div
          className="flex items-center justify-center h-16 w-16 bg-red-500 text-white rounded-full shadow-md animate-scale"
          aria-label="Error icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 5c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7z"
            />
          </svg>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-opacity duration-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-rose-200 opacity-90"></div>
    </div>
  );
}