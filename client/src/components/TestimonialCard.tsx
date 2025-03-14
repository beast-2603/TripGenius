interface TestimonialCardProps {
  avatarUrl: string;
  name: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatarUrl, name, text }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="h-12 w-12 rounded-full" src={avatarUrl} alt={name} />
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-medium text-gray-900">{name}</h4>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

export default TestimonialCard;
