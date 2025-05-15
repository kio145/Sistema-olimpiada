import React from 'react';

function RegistroPostulante() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro de Postulante</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroPostulante;
