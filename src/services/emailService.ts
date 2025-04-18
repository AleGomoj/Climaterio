import emailjs from '@emailjs/browser';

interface EmailParams {
  email: string;
  sessionPreference: string;
}

export const sendFormData = async (params: EmailParams): Promise<void> => {
  const serviceId = 'service_hn8q3yb';
  const templateId = 'template_5ytg8tw';
  const publicKey = '_r7Qe8tp-8kCMmiRi';

  const timestamp = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const emailParams = {
    ...params,
    timestamp,
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      emailParams,
      publicKey
    );

    console.log('EmailJS response:', response);

    if (response.status !== 200) {
      throw new Error('Error al enviar el formulario');
    }

    return Promise.resolve();
  } catch (error) {
    console.error('EmailJS error:', error);
    return Promise.reject(error);
  }
};
