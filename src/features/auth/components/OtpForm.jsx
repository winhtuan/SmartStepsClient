import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const OTP_LENGTH = 6;

const OtpForm = ({
  otp,
  phoneNumber,
  errors,
  isLoading,
  countdown,
  canResend,
  onOtpChange,
  onResend,
  onVerify,
}) => {
  const inputRefs = useRef(Array(OTP_LENGTH).fill(null).map(() => React.createRef()));

  const handleChange = useCallback((value, index) => {
    onOtpChange(value, index);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.current?.focus();
    }
  }, [onOtpChange]);

  const handleKeyPress = useCallback((e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.current?.focus();
    }
  }, [otp]);

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        Nhập mã 6 chữ số đã được gửi đến{'\n'}
        <Text style={styles.phoneHighlight}>{phoneNumber}</Text>
      </Text>

      {errors.general && (
        <ErrorText error={errors.general} style={styles.generalError} />
      )}

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs.current[index]}
            style={[
              styles.otpInput,
              digit ? styles.otpInputFilled : null,
              errors.otp ? styles.otpInputError : null,
            ]}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            accessibilityLabel={`Chữ số OTP thứ ${index + 1}`}
            accessible
          />
        ))}
      </View>

      {errors.otp && (
        <ErrorText error={errors.otp} style={styles.otpError} />
      )}

      <View style={styles.resendRow}>
        {canResend ? (
          <TouchableOpacity
            onPress={onResend}
            activeOpacity={0.7}
            accessibilityLabel="Gửi lại mã OTP"
            accessibilityRole="button"
            accessible
          >
            <Text style={styles.resendActive}>Gửi lại mã</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.resendCountdown}>
            Gửi lại sau{' '}
            <Text style={styles.countdownNumber}>{countdown}s</Text>
          </Text>
        )}
      </View>

      <Button
        title="Xác nhận"
        onPress={onVerify}
        loading={isLoading}
        style={styles.button}
        accessibilityLabel="Xác nhận mã OTP"
        accessibilityRole="button"
        accessible
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  instruction: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  phoneHighlight: {
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  generalError: {
    marginBottom: spacing.md,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderInput,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  otpInputError: {
    borderColor: colors.error,
  },
  otpError: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  resendRow: {
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  resendActive: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  resendCountdown: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  countdownNumber: {
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  button: {
    width: '100%',
  },
});

export default React.memo(OtpForm);
