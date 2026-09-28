import { Clock, Shield, Sparkles, Heart, ArrowRight, Star, CheckCircle } from "lucide-react";
import BoaneLogo from "@/components/BoaneLogo";
import HeroButton from "@/components/HeroButton";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-home.jpg";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const features = [
    {
      icon: Clock,
      title: "Ahorra Tiempo",
      description: "Dedica tu tiempo a lo que realmente importa. Nosotros nos encargamos de la limpieza.",
    },
    {
      icon: Shield,
      title: "100% Confiable",
      description: "Personal verificado y capacitado. Tu hogar en las mejores manos.",
    },
    {
      icon: Sparkles,
      title: "Limpieza Profesional",
      description: "Productos y técnicas de alta calidad para un resultado impecable.",
    },
    {
      icon: Heart,
      title: "Bienestar Total",
      description: "Un hogar limpio es un hogar feliz. Cuida tu salud y bienestar.",
    },
  ];

  const steps = [
    { number: "01", title: "Reserva Online", description: "Elige fecha, hora y tipo de servicio en segundos." },
    { number: "02", title: "Confirma tu Cita", description: "Recibe confirmación inmediata por email y SMS." },
    { number: "03", title: "Relájate", description: "Nuestro equipo llega puntual y deja todo impecable." },
  ];

  const testimonials = [
    { name: "María G.", rating: 5, text: "Increíble servicio. Mi casa nunca había estado tan limpia." },
    { name: "Carlos R.", rating: 5, text: "Profesionales, puntuales y muy detallistas. 100% recomendado." },
    { name: "Ana L.", rating: 5, text: "Por fin tengo tiempo para mi familia. BOANE cambió mi vida." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="home" onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hogar limpio y moderno"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Servicio de limpieza profesional
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Más tiempo para ti.
              <span className="block gradient-text">Menos tiempo limpiando.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Delega la limpieza de tu hogar a profesionales de confianza y disfruta de lo que realmente importa: tu tiempo, tu familia, tu bienestar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButton size="lg" onClick={() => onNavigate?.("booking")}>
                Solicitar Limpieza
                <ArrowRight className="w-5 h-5 ml-2" />
              </HeroButton>
              <HeroButton variant="outline" size="lg" onClick={() => onNavigate?.("services")}>
                Ver Servicios
              </HeroButton>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-light border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-primary">👤</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+2,500</span> clientes satisfechos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir BOANE?
            </h2>
            <p className="text-muted-foreground text-lg">
              Transformamos la limpieza del hogar en una experiencia sin estrés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Así de fácil funciona
            </h2>
            <p className="text-muted-foreground text-lg">
              Reserva tu limpieza en menos de 2 minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Miles de hogares confían en BOANE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="card-gradient p-10 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Listo para recuperar tu tiempo?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Solicita tu primera limpieza hoy y descubre la tranquilidad de un hogar siempre impecable.
            </p>
            <HeroButton size="lg" onClick={() => onNavigate?.("booking")}>
              Empezar Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </HeroButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <BoaneLogo />
            <div className="flex items-center gap-8">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 BOANE. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
