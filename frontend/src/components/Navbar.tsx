import { useState } from "react";
import { Menu, X } from "lucide-react";
import BoaneLogo from "./BoaneLogo";
import HeroButton from "./HeroButton";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navbar = ({ currentPage = "home", onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "services", label: "Servicios" },
    { id: "contact", label: "Contacto" },
    { id: "profile", label: "Mi Cuenta" },
  ];

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <BoaneLogo size="small" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <HeroButton size="default" onClick={() => handleNavigate("booking")}>
              Reservar Ahora
            </HeroButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-down">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-left text-base font-medium py-2 transition-colors duration-200 ${
                    currentPage === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <HeroButton className="mt-2 w-full" onClick={() => handleNavigate("booking")}>
                Reservar Ahora
              </HeroButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
