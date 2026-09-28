import { Home, Building2, Sparkles, Leaf, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";

interface ServicesPageProps {
  onNavigate?: (page: string) => void;
}

const ServicesPage = ({ onNavigate }: ServicesPageProps) => {
  const services = [
    {
      icon: Home,
      title: "Limpieza Regular",
      description: "Mantenimiento semanal o quincenal para un hogar siempre impecable.",
      features: ["Limpieza de todas las habitaciones", "Baños y cocina", "Aspirado y trapeado", "Orden general"],
      price: "Desde $35/sesión",
      popular: false,
    },
    {
      icon: Sparkles,
      title: "Limpieza Profunda",
      description: "Limpieza exhaustiva para ocasiones especiales o como punto de partida.",
      features: ["Todo lo de Limpieza Regular", "Limpieza de electrodomésticos", "Ventanas interiores", "Áreas de difícil acceso"],
      price: "Desde $85/sesión",
      popular: true,
    },
    {
      icon: Building2,
      title: "Post-Mudanza",
      description: "Dejamos tu nuevo hogar listo para disfrutar desde el primer día.",
      features: ["Limpieza completa", "Desinfección profunda", "Armarios y cajones", "Eliminación de residuos"],
      price: "Desde $120/sesión",
      popular: false,
    },
    {
      icon: Leaf,
      title: "Eco-Limpieza",
      description: "Productos 100% ecológicos y biodegradables para un hogar sostenible.",
      features: ["Productos ecológicos", "Sin químicos agresivos", "Seguro para mascotas", "Certificación verde"],
      price: "Desde $45/sesión",
      popular: false,
    },
  ];

  const benefits = [
    { icon: Clock, title: "Ahorra 4+ horas semanales", description: "Tiempo que puedes dedicar a tu familia o hobbies." },
    { icon: CheckCircle, title: "Personal verificado", description: "Todos nuestros profesionales pasan por rigurosos controles." },
    { icon: Sparkles, title: "Satisfacción garantizada", description: "Si no estás 100% satisfecho, volvemos sin costo." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="services" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-accent to-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones de limpieza adaptadas a tus necesidades. Elige el servicio perfecto para tu hogar.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`relative card-gradient p-8 hover:shadow-boane-lg transition-all duration-300 ${
                  service.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Más Popular
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                  <HeroButton onClick={() => onNavigate?.("booking")}>
                    Reservar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </HeroButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Beneficios de elegir BOANE
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas un servicio personalizado?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Contáctanos y crearemos un plan de limpieza adaptado a las necesidades específicas de tu hogar.
          </p>
          <HeroButton
            variant="outline"
            size="lg"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => onNavigate?.("contact")}
          >
            Contactar
          </HeroButton>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
