import { useState, useCallback, useEffect, useRef } from 'react';

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 60;

export const useOtp = (phoneNumber) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_COUNTDOWN);
    setCanResend(false);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleOtpChange = useCallback((value, index) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = cleaned;
      return next;
    });
    if (errors.otp) {
      setErrors({});
    }
  }, [errors.otp]);

  const handleResend = useCallback(async () => {
    if (!canResend) return;
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // await authApi.resendOtp(phoneNumber);
      setOtp(Array(OTP_LENGTH).fill(''));
      setErrors({});
      startCountdown();
    } catch (error) {
      setErrors({ general: 'Không thể gửi lại mã. Vui lòng thử lại.' });
    }
  }, [canResend, startCountdown]);

  const handleVerify = useCallback(async () => {
    const otpCode = otp.join('');
    if (otpCode.length < OTP_LENGTH) {
      setErrors({ otp: 'Vui lòng nhập đầy đủ 6 chữ số' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await authApi.verifyOtp({ phoneNumber, otp: otpCode });
      setVerificationDone(true);
    } catch (error) {
      setErrors({ otp: 'Mã xác thực không đúng. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  }, [otp]);

  return {
    otp,
    errors,
    isLoading,
    verificationDone,
    countdown,
    canResend,
    handleOtpChange,
    handleResend,
    handleVerify,
  };
};
