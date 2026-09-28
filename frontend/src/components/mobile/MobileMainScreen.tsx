import { Home, Sparkles, Calendar, User, Bell, ChevronRight, Star } from "lucide-react";
import HeroButton from "@/components/HeroButton";
import BoaneLogo from "@/components/BoaneLogo";

interface MobileMainScreenProps {
  onBook?: () => void;
  onProfile?: () => void;
}

const MobileMainScreen = ({ onBook, onProfile }: MobileMainScreenProps) => {
  const quickActions = [
    { icon: Home, label: "Regular", color: "bg-primary/10 text-primary" },
    { icon: Sparkles, label: "Profunda", color: "bg-accent text-accent-foreground" },
    { icon: Calendar, label: "Programar", color: "bg-primary-light text-primary" },
  ];

  const nextService = {
    type: "Limpieza Regular",
    date: "Viernes, 22 Enero",
    time: "10:00 AM",
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hola, María 👋</p>
          <p className="font-semibold text-foreground">¿Listo para limpiar?</p>
        </div>
        <button className="relative p-2" onClick={onProfile}>
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Hero Card */}
        <div className="bg-primary rounded-2xl p-5 text-primary-foreground mb-6">
          <p className="text-sm opacity-80 mb-1">Tu próximo servicio</p>
          <p className="font-semibold text-lg mb-1">{nextService.type}</p>
          <p className="text-sm opacity-80">{nextService.date} • {nextService.time}</p>
          <div className="flex items-center justify-between mt-4">
            <button className="text-sm font-medium underline underline-offset-2">
              Ver detalles
            </button>
            <button className="px-4 py-2 bg-primary-foreground text-primary rounded-full text-sm font-medium">
              Modificar
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Reserva rápida</h3>
          <div className="flex gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={onBook}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} transition-transform active:scale-95`}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <HeroButton className="w-full mb-6" onClick={onBook}>
          <Sparkles className="w-4 h-4 mr-2" />
          Nueva Limpieza
        </HeroButton>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Actividad reciente</h3>
            <button className="text-xs text-primary font-medium">Ver todo</button>
          </div>
          
          <div className="space-y-3">
            {[
              { type: "Limpieza Profunda", date: "15 Ene", rating: 5 },
              { type: "Limpieza Regular", date: "8 Ene", rating: 5 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-4">
        {[
          { icon: Home, label: "Inicio", active: true },
          { icon: Calendar, label: "Reservas", active: false },
          { icon: Sparkles, label: "Servicios", active: false },
          { icon: User, label: "Perfil", active: false },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.label === "Perfil" ? onProfile : undefined}
            className={`flex flex-col items-center gap-1 ${
              item.active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMainScreen;
