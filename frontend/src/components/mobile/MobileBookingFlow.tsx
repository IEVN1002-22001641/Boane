import { useState } from "react";
import { ArrowLeft, Home, Sparkles, Shield, Calendar, Clock, CheckCircle } from "lucide-react";
import HeroButton from "@/components/HeroButton";

interface MobileBookingFlowProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const MobileBookingFlow = ({ onBack, onComplete }: MobileBookingFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services = [
    { id: "regular", name: "Regular", price: "$35", icon: Home },
    { id: "deep", name: "Profunda", price: "$85", icon: Sparkles },
    { id: "moving", name: "Mudanza", price: "$120", icon: Shield },
  ];

  const dates = [
    { day: "Lun", date: 20 },
    { day: "Mar", date: 21 },
    { day: "Mié", date: 22 },
    { day: "Jue", date: 23 },
    { day: "Vie", date: 24 },
  ];

  const times = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete?.();
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {step === 1 && "Elige servicio"}
            {step === 2 && "Fecha y hora"}
            {step === 3 && "Confirmar"}
          </p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Step 1: Service */}
        {step === 1 && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              Selecciona el tipo de limpieza
            </p>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                  selectedService === service.id
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedService === service.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">Limpieza {service.name.toLowerCase()}</p>
                </div>
                <span className="text-lg font-bold text-primary">{service.price}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Selecciona fecha
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`flex-shrink-0 w-14 py-3 rounded-xl text-center transition-all ${
                      selectedDate === d.date
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-xs opacity-70">{d.day}</p>
                    <p className="text-lg font-bold">{d.date}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Selecciona hora
              </p>
              <div className="grid grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Todo listo
              </h2>
              <p className="text-sm text-muted-foreground">
                Revisa tu reserva
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Servicio</span>
                <span className="font-medium text-foreground">
                  {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fecha</span>
                <span className="font-medium text-foreground">Enero {selectedDate}, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hora</span>
                <span className="font-medium text-foreground">{selectedTime} AM</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">
                  {services.find((s) => s.id === selectedService)?.price}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <HeroButton
          className="w-full"
          onClick={handleNext}
          disabled={
            (step === 1 && !selectedService) ||
            (step === 2 && (!selectedDate || !selectedTime))
          }
        >
          {step === 3 ? "Confirmar Reserva" : "Continuar"}
        </HeroButton>
      </div>
    </div>
  );
};

export default MobileBookingFlow;
