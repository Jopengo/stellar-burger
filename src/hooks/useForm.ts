import { useState, ChangeEvent } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const isCheckbox = (event.target as HTMLInputElement).type === 'checkbox';
    const checked = (event.target as HTMLInputElement).checked;

    setValues({
      ...values,
      [name]: isCheckbox ? checked : value,
    });
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, setValues, reset };
}
