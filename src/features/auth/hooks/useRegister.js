import { useState, useCallback } from 'react';

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
};

const validatePassword = (password) => {
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
};

export const useRegister = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên đầy đủ';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'Bạn cần đồng ý với điều khoản để tiếp tục';
    }

    return newErrors;
  }, [name, phoneNumber, password, confirmPassword, agreedToTerms]);

  const handleRegister = useCallback(async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await authApi.register({ name, phoneNumber, password });
      setRegistrationDone(true);
    } catch (error) {
      setErrors({ general: 'Đăng ký thất bại. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  }, [validate]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setIsConfirmPasswordVisible((prev) => !prev);
  }, []);

  const toggleAgreedToTerms = useCallback(() => {
    setAgreedToTerms((prev) => !prev);
    if (errors.terms) {
      setErrors((prev) => ({ ...prev, terms: undefined }));
    }
  }, [errors.terms]);

  const handleNameChange = useCallback((text) => {
    setName(text);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  }, [errors.name]);

  const handlePhoneChange = useCallback((text) => {
    setPhoneNumber(text);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  }, [errors.phoneNumber]);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  }, [errors.password]);

  const handleConfirmPasswordChange = useCallback((text) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  }, [errors.confirmPassword]);

  return {
    name,
    phoneNumber,
    password,
    confirmPassword,
    isPasswordVisible,
    isConfirmPasswordVisible,
    agreedToTerms,
    errors,
    isLoading,
    registrationDone,
    handleNameChange,
    handlePhoneChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    toggleAgreedToTerms,
  };
};
