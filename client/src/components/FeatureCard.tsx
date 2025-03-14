import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div 
      className="relative p-6 rounded-xl shadow-lg card-hover bg-white border border-gray-100"
      data-aos="fade-up"
    >
      <div className="mb-5 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white transform transition-transform duration-300 hover:scale-110">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
