import React, { useState, useRef, FormEvent } from 'react';

const Contact: React.FC = () => {
  // Estado para almacenar los valores de los inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    message: '',
  });

  // Referencias para los inputs (opcional para acceso directo)
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Procesar los datos del formulario
    console.log('Datos enviados:', formData);

    // Limpiar el formulario si es necesario
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-md shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRef}
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          ref={phoneRef}
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          ref={messageRef}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default Contact;