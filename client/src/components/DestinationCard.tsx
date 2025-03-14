interface DestinationCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ imageUrl, title, description }) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl shadow-xl card-hover bg-white cursor-pointer"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <div className="relative h-64 overflow-hidden">
        <img className="h-64 w-full object-cover transform transition-transform duration-500 group-hover:scale-110" src={imageUrl} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-6 transform transition-all duration-300 group-hover:translate-y-[-5px]">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">{title}</h3>
        <div className="h-0.5 w-0 group-hover:w-16 bg-blue-400 transition-all duration-500 mb-2"></div>
        <p className="text-sm text-gray-200 mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{description}</p>
      </div>
      <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default DestinationCard;
