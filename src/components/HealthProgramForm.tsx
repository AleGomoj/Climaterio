import React from 'react';
import FormHeader from './FormHeader';
import FormFields from './FormFields';
import { useFormContext } from '../context/FormContext';

const HealthProgramForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage } = useFormContext();
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 flex-1 flex items-center">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
        <div className="relative">
          <FormHeader />
          <div className="p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg 
                    className="w-8 h-8 text-green-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">¡Registro completado!</h3>
                <p className="text-gray-600 mb-6">
                  Gracias por inscribirte en el programa de salud del climaterio. 
                  Te enviaremos un correo con más información.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Volver al inicio
                </button>
              </div>
            ) : isError ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <svg 
                    className="w-8 h-8 text-red-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Error al enviar el formulario</h3>
                <p className="text-gray-600 mb-6">
                  {errorMessage || 'Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <FormFields isSubmitting={isSubmitting} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProgramForm;