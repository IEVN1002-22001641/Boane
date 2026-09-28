import { Sparkles } from "lucide-react";

const BoaneLogo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-boane-turquoise">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-light border-2 border-background" />
      </div>
      <span className={`font-bold tracking-tight text-foreground ${sizeClasses[size]}`}>
        BOANE
      </span>
    </div>
  );
};

export default BoaneLogo;
