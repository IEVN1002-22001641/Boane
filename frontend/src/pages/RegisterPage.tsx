import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroButton from "@/components/HeroButton";

const RegisterPage = ({ onNavigate }: any) => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    rol: "cliente",
  });

  const register = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuario creado");
      onNavigate?.("login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex items-center justify-center">
        <div className="card-gradient p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Crear Cuenta
          </h2>

          <div className="space-y-4">
            <input
              placeholder="Nombre"
              className="w-full p-3 border rounded"
              onChange={(e) =>
                setForm({ ...form, nombre: e.target.value })
              }
            />

            <input
              placeholder="Correo"
              className="w-full p-3 border rounded"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 border rounded"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <input
              placeholder="Dirección"
              className="w-full p-3 border rounded"
              onChange={(e) =>
                setForm({ ...form, direccion: e.target.value })
              }
            />

            <select
               className="w-full p-3 border rounded"
               onChange={(e) =>
                 setForm({ ...form, rol: e.target.value })
               }
            >
               <option value="cliente">Cliente</option>
               <option value="empleado">Empleado</option>
            </select>

            <HeroButton className="w-full" onClick={register}>
              Registrarse
            </HeroButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;