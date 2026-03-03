import { useState, useCallback } from 'react';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt with', { email, password });
      
      // Navigate or handle successful login via Redux slice, etc.
      // Example: dispatch(loginUser({ email, password }))
      
    } catch (error) {
      console.error('Login failed', error);
      setErrors({ general: 'Failed to sign in. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, validate]);

  const handleSetEmail = useCallback((val) => {
    setEmail(val);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  }, [errors.email]);

  const handleSetPassword = useCallback((val) => {
    setPassword(val);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  }, [errors.password]);

  return {
    email,
    setEmail: handleSetEmail,
    password,
    setPassword: handleSetPassword,
    errors,
    isLoading,
    handleLogin,
  };
};
