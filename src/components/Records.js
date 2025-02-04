// src/pages/Records.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { downloadReport } from "../services/reportService";
// ... otros imports

const Records = () => {
  const [records, setRecords] = useState([]);
  const role = localStorage.getItem("role"); // Para condicionar
  const token = localStorage.getItem("token");

  // ... useEffect para cargar records

  return (
    <div>
      <h1>Registros de Marcado</h1>

      {/* Lista de registros ... */}

      {/* Solo ADMIN ve botones de reportes */}
      {role === "ADMIN" && (
        <div>
          <button onClick={() => downloadReport("csv")}>Exportar CSV</button>
          <button onClick={() => downloadReport("pdf")}>Exportar PDF</button>
          <button onClick={() => downloadReport("excel")}>Exportar Excel</button>
        </div>
      )}
    </div>
  );
};

export default Records;
