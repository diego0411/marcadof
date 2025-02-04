import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white h-screen">
      <ul className="space-y-4">
        <li>
          <Link to="/marking">Marcar Asistencia</Link>
        </li>
        <li>
          <Link to="/records">Ver Registros</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
