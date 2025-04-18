import React from 'react';
import { HeartPulse } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-8 px-6 md:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(20, 184, 166, 0.85)), url('https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
        <div className="relative flex items-center justify-between mb-2">
          <HeartPulse size={40} className="text-white animate-pulse" />
          <div className="text-xs md:text-sm bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full">
            Programa de Salud
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 relative">
          Programa de Salud del Climaterio
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl relative">
          Inscríbete de forma anónima en nuestro programa especializado para mejorar tu bienestar durante esta etapa vital.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default FormHeader;