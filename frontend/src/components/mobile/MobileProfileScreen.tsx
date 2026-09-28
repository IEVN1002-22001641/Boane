import { ArrowLeft, Settings, Star, Calendar, Clock, MapPin, ChevronRight, LogOut } from "lucide-react";
import HeroButton from "@/components/HeroButton";

interface MobileProfileScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
}

const MobileProfileScreen = ({ onBack, onLogout }: MobileProfileScreenProps) => {
  const user = {
    name: "María García",
    email: "maria.garcia@email.com",
    avatar: "MG",
    stats: {
      services: 12,
      rating: 4.9,
      saved: "48h",
    },
  };

  const menuItems = [
    { icon: Calendar, label: "Mis Reservas", badge: "1 próxima" },
    { icon: MapPin, label: "Direcciones guardadas" },
    { icon: Star, label: "Valoraciones" },
    { icon: Settings, label: "Configuración" },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="font-semibold text-foreground">Mi Perfil</span>
        <button>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-6 text-center border-b border-border">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-3 shadow-boane-turquoise">
            {user.avatar}
          </div>
          <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around py-6 border-b border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{user.stats.services}</p>
            <p className="text-xs text-muted-foreground">Servicios</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <p className="text-2xl font-bold text-primary">{user.stats.rating}</p>
              <Star className="w-4 h-4 fill-primary text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Valoración</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{user.stats.saved}</p>
            <p className="text-xs text-muted-foreground">Ahorradas</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-4 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileScreen;
