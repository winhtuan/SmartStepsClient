import { useState, useCallback } from 'react';

export const useLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^(0|\+84)[0-9]{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [phoneNumber, password]);

  const handleLogin = useCallback(async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt with', { phoneNumber, password });
      
      // Navigate or handle successful login via Redux slice, etc.
      // Example: dispatch(loginUser({ phoneNumber, password }))
      
    } catch (error) {
      console.error('Login failed', error);
      setErrors({ general: 'Đăng nhập thất bại. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, password, validate]);

  const handleSetPhoneNumber = useCallback((val) => {
    setPhoneNumber(val);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: null }));
    }
  }, [errors.phoneNumber]);

  const handleSetPassword = useCallback((val) => {
    setPassword(val);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  }, [errors.password]);

  return {
    phoneNumber,
    setPhoneNumber: handleSetPhoneNumber,
    password,
    setPassword: handleSetPassword,
    errors,
    isLoading,
    handleLogin,
  };
};
