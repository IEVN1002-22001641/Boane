import { Sparkles } from "lucide-react";
import HeroButton from "@/components/HeroButton";

interface MobileWelcomeScreenProps {
  onContinue?: () => void;
}

const MobileWelcomeScreen = ({ onContinue }: MobileWelcomeScreenProps) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background via-background to-accent p-6">
      {/* Logo Animation */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-boane-turquoise animate-float">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-light border-2 border-background" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          BOANE
        </h1>
        <p className="text-primary font-medium text-center mb-4">
          Limpieza a domicilio
        </p>
        
        <p className="text-muted-foreground text-center text-sm leading-relaxed max-w-[220px]">
          Más tiempo para ti.<br />
          Menos tiempo limpiando.
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <HeroButton className="w-full" onClick={onContinue}>
          Comenzar
        </HeroButton>
        <button className="w-full text-center text-sm text-muted-foreground py-2">
          Ya tengo cuenta
        </button>
      </div>
    </div>
  );
};

export default MobileWelcomeScreen;
