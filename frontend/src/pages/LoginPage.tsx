import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";

const LoginPage = ({ onNavigate }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login exitoso");

    if (data.rol === "cliente") {
      onNavigate?.("home");
    } else if (data.rol === "empleado") {
      onNavigate?.("employee");
    }
  } else {
    alert(data.error);
  }
};

  return (
    <div className="min-h-screen bg-background flex flex-col">


      <div className="flex-1 flex items-center justify-center">
        <div className="card-gradient p-8 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Iniciar Sesión
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Correo"
              className="w-full p-3 rounded-lg border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 rounded-lg border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <HeroButton className="w-full" onClick={login}>
              Iniciar sesión
            </HeroButton>

            <p className="text-center text-sm">
              ¿No tienes cuenta?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => onNavigate?.("register")}
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;