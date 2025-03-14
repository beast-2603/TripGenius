interface TestimonialCardProps {
  avatarUrl: string;
  name: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatarUrl, name, text }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg card-hover border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-blue-50 -mr-10 -mt-10 rounded-full z-0 opacity-80"></div>
      
      <div className="relative z-10">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-14 w-14 rounded-full border-2 border-primary p-0.5" src={avatarUrl} alt={name} />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-6">
          <svg className="absolute top-0 left-0 transform -translate-y-6 -translate-x-2 h-8 w-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="relative mt-2 text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
