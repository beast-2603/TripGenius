interface DestinationCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
      <img className="h-64 w-full object-cover" src={imageUrl} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
