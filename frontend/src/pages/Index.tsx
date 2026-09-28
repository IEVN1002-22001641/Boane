import { useState } from "react";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import ProfilePage from "@/pages/ProfilePage";
import BookingPage from "@/pages/BookingPage";
import MobileFrame from "@/components/MobileFrame";
import MobileWelcomeScreen from "@/components/mobile/MobileWelcomeScreen";
import MobileLoginScreen from "@/components/mobile/MobileLoginScreen";
import MobileMainScreen from "@/components/mobile/MobileMainScreen";
import MobileBookingFlow from "@/components/mobile/MobileBookingFlow";
import MobileProfileScreen from "@/components/mobile/MobileProfileScreen";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import EmployeePage from "@/pages/EmployeePage";

import { Monitor, Smartphone } from "lucide-react";

type WebPage =
  | "login"
  | "register"
  | "home"
  | "services"
  | "contact"
  | "profile"
  | "booking"
    "employee"
  | "admin";

type MobileScreen = "welcome" | "login" | "main" | "booking" | "profile";

const Index = () => {
  const [viewMode, setViewMode] = useState<"web" | "mobile">("web");
  const [currentWebPage, setCurrentWebPage] = useState<WebPage>("login");
  const [currentMobileScreen, setCurrentMobileScreen] = useState<MobileScreen>("welcome");

  const handleWebNavigate = (page: string) => {
    setCurrentWebPage(page as WebPage);
  };

  const renderWebPage = () => {
    switch (currentWebPage) {
      case "employee":
        return <EmployeePage />;
      case "admin":
        return <AdminPage />;
      case "login":
        return <LoginPage onNavigate={handleWebNavigate} />;
      case "register":
        return <RegisterPage onNavigate={handleWebNavigate} />;
      case "home":
        return <HomePage onNavigate={handleWebNavigate} />;
      case "services":
        return <ServicesPage onNavigate={handleWebNavigate} />;
      case "contact":
        return <ContactPage onNavigate={handleWebNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleWebNavigate} />;
      case "booking":
        return <BookingPage onNavigate={handleWebNavigate} />;
      default:
        return <HomePage onNavigate={handleWebNavigate} />;
    }
  };

  const renderMobileScreen = () => {
    switch (currentMobileScreen) {
      case "welcome":
        return <MobileWelcomeScreen onContinue={() => setCurrentMobileScreen("login")} />;
      case "login":
        return (
          <MobileLoginScreen
            onLogin={() => setCurrentMobileScreen("main")}
            onRegister={() => setCurrentMobileScreen("main")}
          />
        );
      case "main":
        return (
          <MobileMainScreen
            onBook={() => setCurrentMobileScreen("booking")}
            onProfile={() => setCurrentMobileScreen("profile")}
          />
        );
      case "booking":
        return (
          <MobileBookingFlow
            onBack={() => setCurrentMobileScreen("main")}
            onComplete={() => setCurrentMobileScreen("main")}
          />
        );
      case "profile":
        return (
          <MobileProfileScreen
            onBack={() => setCurrentMobileScreen("main")}
            onLogout={() => setCurrentMobileScreen("welcome")}
          />
        );
      default:
        return <MobileWelcomeScreen onContinue={() => setCurrentMobileScreen("login")} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 p-1 bg-background rounded-full shadow-boane-lg border border-border">
        <button
          onClick={() => setViewMode("web")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "web"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Web
        </button>
        <button
          onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "mobile"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          App
        </button>
      </div>

      {viewMode === "web" ? (
        <div className="animate-fade-in">{renderWebPage()}</div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted via-background to-accent animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            BOANE Mobile App
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-md">
            Mockup interactivo de la aplicación móvil. Navega entre pantallas haciendo clic en los botones.
          </p>

          <MobileFrame>{renderMobileScreen()}</MobileFrame>

          {/* Mobile Screen Navigation */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: "welcome", label: "Bienvenida" },
              { id: "login", label: "Login" },
              { id: "main", label: "Principal" },
              { id: "booking", label: "Reserva" },
              { id: "profile", label: "Perfil" },
            ].map((screen) => (
              <button
                key={screen.id}
                onClick={() => setCurrentMobileScreen(screen.id as MobileScreen)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentMobileScreen === screen.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Web Page Navigation (when in web mode) */}
      {viewMode === "web" && currentWebPage !== "login" && currentWebPage !== "register" && currentWebPage !== "employee" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-background/95 backdrop-blur-sm rounded-full shadow-boane-lg border border-border">
          {[
            { id: "home", label: "Home" },
            { id: "services", label: "Servicios" },
            { id: "contact", label: "Contacto" },
            { id: "profile", label: "Perfil" },
            { id: "booking", label: "Reserva" },
          ].map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentWebPage(page.id as WebPage)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentWebPage === page.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
