interface SuccessStepProps {
  title: string;
  description: string;
}

export default function SuccessStep({ title, description }: SuccessStepProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-200 to-lime-300">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-20">
        <div
          className="flex items-center justify-center h-16 w-16 bg-green-500 text-white rounded-full shadow-md animate-scale"
          aria-label="Success icon"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-opacity duration-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-lime-200 opacity-90"></div>
    </div>
  );
}
