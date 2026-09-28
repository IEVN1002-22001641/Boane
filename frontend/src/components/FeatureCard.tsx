import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="card-gradient p-6 hover:shadow-boane-lg transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-boane-turquoise transition-all duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
