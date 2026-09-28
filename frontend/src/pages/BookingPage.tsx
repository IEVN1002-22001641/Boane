import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Home,
  Sparkles,
  Shield,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const serviceMap: any = {
  regular: 1,
  deep: 2,
  moving: 3,
};

interface BookingPageProps {
  onNavigate?: (page: string) => void;
}

const BookingPage = ({ onNavigate }: BookingPageProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 🔥 BACKEND (se mantiene igual)
  const crearPedido = async () => {
    try {
      console.log("🔥 CREANDO PEDIDO...");
      const res = await fetch("http://localhost:5000/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id_servicio: serviceMap[selectedService!],
          fecha: selectedDate,
          hora: selectedTime,
          direccion: "Dirección del usuario",
        }),
      });

      const data = await res.json();
      console.log("🔥 RESPUESTA BACKEND:", data);

      if (!res.ok) {
        alert(data.error);
        return false;
      }

      onNavigate?.("profile");
      return true;
    } catch (error) {
      console.error(error);
      alert("Error al crear pedido");
      return false;
    }
  };

  const services = [
    { id: "regular", name: "Limpieza Regular", price: 35, icon: Home, duration: "2-3 horas" },
    { id: "deep", name: "Limpieza Profunda", price: 85, icon: Sparkles, duration: "4-5 horas" },
    { id: "moving", name: "Post-Mudanza", price: 120, icon: Shield, duration: "5-6 horas" },
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const getSelectedServiceData = () =>
    services.find((s) => s.id === selectedService);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== "" && selectedTime !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="booking" onNavigate={onNavigate} />

      <section className="pt-24 pb-8">
        <div className="container max-w-3xl">

          {/* 🔥 PROGRESS BONITO */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {["Servicio", "Fecha y Hora", "Confirmación", "Pago"].map((label, index) => (
                <div key={label} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      index + 1 <= step
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`hidden sm:block w-16 md:w-24 h-1 mx-2 rounded-full transition-all ${
                        index + 1 < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Paso {step} de 4
            </p>
          </div>

          <div className="card-gradient p-6 md:p-8">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Elige tu Servicio</h2>

                <div className="space-y-4">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
                        selectedService === s.id
                          ? "border-primary bg-accent shadow-lg scale-[1.02]"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            selectedService === s.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <s.icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-sm text-muted-foreground">{s.duration}</p>
                        </div>

                        <span className="text-xl font-bold text-primary">
                          ${s.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Fecha y Hora</h2>

                <div className="space-y-6">
                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      Fecha
                    </Label>

                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-primary" />
                      Hora
                    </Label>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                            selectedTime === t
                              ? "border-primary bg-primary text-primary-foreground scale-105"
                              : "border-border hover:border-primary/50 hover:scale-105"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Confirmación</h2>

                <div className="p-5 bg-muted/50 rounded-xl space-y-3">
                  <p><strong>Servicio:</strong> {getSelectedServiceData()?.name}</p>
                  <p><strong>Fecha:</strong> {selectedDate}</p>
                  <p><strong>Hora:</strong> {selectedTime}</p>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="animate-fade-in text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4 animate-bounce" />
                <p className="text-xl font-bold">Reserva confirmada</p>
              </div>
            )}

            {/* NAV */}
            {step < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>

                <HeroButton
                  onClick={async () => {
                    if (step === 3) {
                      await crearPedido();
                    } else {
                      handleNext();
                    }
                  }}
                  disabled={!canProceed()}
                >
                  {step === 3 ? (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Confirmar
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </HeroButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;