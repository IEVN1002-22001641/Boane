import { Calendar, Settings, Clock, MapPin, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  const [user, setUser] = useState<any>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);

  // 🔥 FUNCIONES FUERA
  const fetchPerfil = async () => {
    const res = await fetch("http://localhost:5000/perfil", {
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data);
    } else {
      console.log("No autenticado");
    }
  };

  const fetchPedidos = async () => {
    const res = await fetch("http://localhost:5000/mis-pedidos", {
      credentials: "include",
    });

    const data = await res.json();

    console.log("🔥 PEDIDOS FRONTEND:", data);

    if (res.ok) {
      setPedidos(data);
    }
  };

  useEffect(() => {
  fetchPerfil();
  fetchPedidos();

  const interval = setInterval(() => {
    fetchPedidos();
  }, 3000); // refresca cada 3s

  return () => clearInterval(interval);
}, []);

  const upcomingServices = pedidos.filter(
    (p) => p.estado === "pendiente" || p.estado === "aceptado"
  );

  const recentServices = pedidos.filter(
    (p) => p.estado === "completado"
  );

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="profile" onNavigate={onNavigate} />

      <section className="pt-24 pb-8">
        <div className="container">

          <div className="card-gradient p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                {user.nombre?.charAt(0)}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">{user.nombre}</h1>
                <p className="text-muted-foreground mb-4">Cliente registrado</p>

                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {user.direccion}
                  </span>
                </div>
              </div>

              <HeroButton variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </HeroButton>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="space-y-4">
              <div className="card-gradient p-6">
                <h3 className="font-semibold mb-4">Resumen</h3>
                <div className="space-y-3 text-sm">
                  <p>Total pedidos: {pedidos.length}</p>
                  <p>Activos: {upcomingServices.length}</p>
                  <p>Completados: {recentServices.length}</p>
                </div>
              </div>

              <HeroButton
                className="w-full"
                onClick={() => onNavigate?.("booking")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Nueva Reserva
              </HeroButton>
            </div>

            <div className="lg:col-span-2 space-y-6">

              <div className="card-gradient p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Próximos Servicios
                </h3>

                {upcomingServices.length > 0 ? (
                  upcomingServices.map((s) => (
                    <div key={s.id} className="p-4 bg-accent rounded-xl flex justify-between">
                      <div>
                        <p className="font-medium">{s.servicio_nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {s.fecha} • {s.hora}
                        </p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {s.estado}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No tienes servicios programados</p>
                )}
              </div>

              <div className="card-gradient p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Historial
                </h3>

                {recentServices.length > 0 ? (
                  recentServices.map((s) => (
                    <div key={s.id} className="p-4 border rounded-xl flex justify-between">
                      <div>
                        <p className="font-medium">{s.servicio_nombre}</p>
                        <p className="text-sm text-muted-foreground">{s.fecha}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {s.estado}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No tienes historial aún</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;