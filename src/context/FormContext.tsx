import React, { createContext, useContext, useState } from 'react';
import { sendFormData } from '../services/emailService';

interface FormData {
  email: string;
  sessionPreference: string;
  errors: {
    email?: string;
    sessionPreference?: string;
  };
}

interface FormContextType {
  formData: FormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  updateFormData: (field: string, value: string) => void;
  validateForm: () => boolean;
  handleSubmit: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    sessionPreference: '',
    errors: {},
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined,
      }
    }));
  };

  const validateForm = () => {
    const errors: { email?: string; sessionPreference?: string } = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Dirección de correo electrónico no válida';
    }
    
    // Session preference validation
    if (!formData.sessionPreference) {
      errors.sessionPreference = 'Por favor, selecciona un horario';
    }
    
    setFormData(prev => ({
      ...prev,
      errors
    }));
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      dateStyle: 'long',
      timeStyle: 'short',
    });
    
    try {
      const formattedSession = formData.sessionPreference === 'martes' 
        ? 'Martes de 10:00 a 11:30'
        : 'Jueves de 18:00 a 19:30';

      const templateParams = {
        email: formData.email,
        sessionPreference: formattedSession,
        timestamp: timestamp,
      };
      
      await sendFormData(templateParams);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error sending form:', error);
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    formData,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    updateFormData,
    validateForm,
    handleSubmit,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};