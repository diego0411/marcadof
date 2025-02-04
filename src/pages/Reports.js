import React from "react";
import { downloadReport } from "../services/reportService";

const Reports = () => {
  const handleDownload = async (type) => {
    try {
      await downloadReport(type);
    } catch (error) {
      console.error("Error descargando el reporte:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generar Reportes</h1>
      <div className="flex gap-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleDownload("pdf")}
        >
          Descargar PDF
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleDownload("csv")}
        >
          Descargar CSV
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleDownload("excel")}
        >
          Descargar Excel
        </button>
      </div>
    </div>
  );
};

export default Reports;
