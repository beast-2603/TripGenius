interface DestinationCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-xl card-hover bg-white">
      <div className="relative h-64 overflow-hidden">
        <img className="h-64 w-full object-cover transform transition-transform duration-500 group-hover:scale-110" src={imageUrl} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200 mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{description}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
