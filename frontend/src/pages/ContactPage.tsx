import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

const ContactPage = ({ onNavigate }: ContactPageProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hola@boane.com" },
    { icon: Phone, label: "Teléfono", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Zona de servicio", value: "Ciudad de México y área metropolitana" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="contact" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-accent to-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Información de Contacto
              </h2>
              <p className="text-muted-foreground mb-8">
                ¿Tienes preguntas sobre nuestros servicios? ¿Necesitas un presupuesto personalizado? 
                Estamos encantados de atenderte.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="font-semibold text-foreground mb-2">Horario de Atención</h3>
                <p className="text-muted-foreground text-sm">
                  Lunes a Viernes: 8:00 AM - 8:00 PM<br />
                  Sábados: 9:00 AM - 6:00 PM<br />
                  Domingos: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-gradient p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Gracias por contactarnos. Te responderemos en menos de 24 horas.
                  </p>
                  <HeroButton onClick={() => setSubmitted(false)}>
                    Enviar Otro Mensaje
                  </HeroButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Envíanos un Mensaje
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <HeroButton type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </HeroButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
