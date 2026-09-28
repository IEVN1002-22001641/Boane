import { useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";

const EmployeePage = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("http://localhost:5000/pedidos-disponibles", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setPedidos(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const aceptarPedido = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/aceptar-pedido/${id}`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // 🔥 quitar pedido de la lista automáticamente
        setPedidos((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPedidos();


    const interval = setInterval(fetchPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="employee" />

      <section className="pt-24 pb-8">
        <div className="container max-w-5xl">

          {/* HEADER */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Panel de Empleado
            </h1>
            <p className="text-muted-foreground">
              Acepta servicios disponibles cerca de ti
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-10 text-muted-foreground">
              Cargando servicios...
            </div>
          )}

          {/* SIN PEDIDOS */}
          {!loading && pedidos.length === 0 && (
            <div className="card-gradient p-10 text-center animate-fade-in">
              <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">
                No hay servicios disponibles
              </p>
              <p className="text-sm text-muted-foreground">
                Vuelve a revisar en unos minutos
              </p>
            </div>
          )}

          {/* LISTA DE PEDIDOS */}
          <div className="grid md:grid-cols-2 gap-6">
            {pedidos.map((p) => (
              <div
                key={p.id}
                className="card-gradient p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:scale-[1.02] animate-fade-in"
              >
                {/* Servicio */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {p.servicio_nombre}
                  </h3>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {p.fecha} • {p.hora}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {p.direccion}
                  </div>
                </div>

                {/* BOTÓN */}
                <HeroButton
                  className="w-full"
                  onClick={() => aceptarPedido(p.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aceptar servicio
                </HeroButton>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default EmployeePage;