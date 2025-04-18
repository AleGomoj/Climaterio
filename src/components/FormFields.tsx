import React from 'react';
import { useFormContext } from '../context/FormContext';
import { Mail, Calendar, Clock, ArrowRight } from 'lucide-react';

const FormFields = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { formData, updateFormData, validateForm, handleSubmit } = useFormContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center text-gray-700 font-medium">
            <Mail size={18} className="mr-2 text-blue-500" />
            Correo electrónico
          </label>
          <div className="relative group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu-correo@ejemplo.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                formData.errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-4 transition-all duration-300`}
              required
            />
            {formData.errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{formData.errors.email}</p>
            )}
            <div className="absolute inset-0 border border-blue-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            * Tu dirección de correo es el único dato personal que recogeremos.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="sessionPreference" className="flex items-center text-gray-700 font-medium">
            <Calendar size={18} className="mr-2 text-blue-500" />
            Selecciona el horario al que deseas asistir
          </label>
          <div className="relative group">
            <div className="relative">
              <select
                id="sessionPreference"
                name="sessionPreference"
                value={formData.sessionPreference}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white ${
                  formData.errors.sessionPreference ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-4 transition-all duration-300`}
                required
              >
                <option value="" disabled>Selecciona un horario</option>
                <option value="martes">Martes de 10:00 a 11:30</option>
                <option value="jueves">Jueves de 18:00 a 19:30</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Clock size={18} className="text-gray-500" />
              </div>
            </div>
            {formData.errors.sessionPreference && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{formData.errors.sessionPreference}</p>
            )}
            <div className="absolute inset-0 border border-blue-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 transform ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg active:scale-98'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Inscribirme
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-6">
        <p>Al inscribirte, aceptas que te enviemos información relacionada con el programa.</p>
      </div>
    </form>
  );
};

export default FormFields;