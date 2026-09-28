import { useEffect, useState } from "react";

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/usuarios", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setUsuarios);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Panel Admin</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u: any) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;