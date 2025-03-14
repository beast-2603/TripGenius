import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div 
      className="feature-card relative p-6 rounded-xl shadow-md bg-white border border-gray-100"
      data-aos="fade-up"
    >
      <div className="feature-icon mb-5 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
    </div>
  );
};

export default FeatureCard;
