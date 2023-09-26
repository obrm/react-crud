import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useForm = (initialFormData, apiMethod, apiPath, navigatePath) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiMethod(apiPath, formData);
      navigate(navigatePath);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    handleChange,
    handleSubmit
  };
};
export default useForm;