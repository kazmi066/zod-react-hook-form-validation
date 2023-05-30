import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  register,
  error,
}) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
      placeholder={label}
      {...register(id)}
    />
    {error && (
      <span className="text-red-800 block mt-2">{error?.message}</span>
    )}
  </div>
);

export { InputField };
