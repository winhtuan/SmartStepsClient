import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Field from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { colors } from '../../../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterForm = ({
  name,
  phoneNumber,
  password,
  confirmPassword,
  isPasswordVisible,
  isConfirmPasswordVisible,
  agreedToTerms,
  errors,
  isLoading,
  onSubmit,
  onNameChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onToggleTerms,
}) => {
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleNameSubmit = useCallback(() => {
    phoneRef.current?.focus();
  }, []);

  const handlePhoneSubmit = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    confirmPasswordRef.current?.focus();
  }, []);

  const handleConfirmPasswordSubmit = useCallback(() => {
    Keyboard.dismiss();
    onSubmit();
  }, [onSubmit]);

  return (
    <View style={styles.container}>
      {errors.general && (
        <ErrorText error={errors.general} style={styles.generalError} />
      )}

      <View style={styles.inputGroup}>
        <Field
          label="Họ và tên"
          placeholder="VD: Nguyễn Văn A"
          value={name}
          onChangeText={onNameChange}
          error={errors.name}
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          onSubmitEditing={handleNameSubmit}
          blurOnSubmit={false}
          leftIcon={<Icon name="user" size={22} color={colors.textSecondary} />}
          labelStyle={styles.fieldLabel}
          containerStyle={styles.fieldContainer}
          accessibilityHint="Nhập họ và tên đầy đủ của bạn"
        />

        <Field
          ref={phoneRef}
          label="Số điện thoại"
          placeholder="VD: 0912345678"
          value={phoneNumber}
          onChangeText={onPhoneChange}
          error={errors.phoneNumber}
          keyboardType="phone-pad"
          autoComplete="tel"
          returnKeyType="next"
          onSubmitEditing={handlePhoneSubmit}
          blurOnSubmit={false}
          leftIcon={<Icon name="phone" size={22} color={colors.textSecondary} />}
          labelStyle={styles.fieldLabel}
          containerStyle={styles.fieldContainer}
          accessibilityHint="Nhập số điện thoại 10 chữ số"
        />

        <Field
          ref={passwordRef}
          label="Mật khẩu"
          placeholder="Ít nhất 8 ký tự, gồm chữ và số"
          value={password}
          onChangeText={onPasswordChange}
          error={errors.password}
          secureTextEntry={!isPasswordVisible}
          autoComplete="new-password"
          returnKeyType="next"
          onSubmitEditing={handlePasswordSubmit}
          blurOnSubmit={false}
          leftIcon={<Icon name="lock" size={22} color={colors.textSecondary} />}
          rightIcon={
            <TouchableOpacity
              onPress={onTogglePassword}
              activeOpacity={0.7}
              style={styles.eyeButton}
              accessibilityLabel={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              accessibilityRole="button"
              accessible
            >
              <Icon
                name={isPasswordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color={isPasswordVisible ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
          }
          labelStyle={styles.fieldLabel}
          containerStyle={styles.fieldContainer}
          accessibilityHint="Nhập mật khẩu ít nhất 8 ký tự bao gồm chữ và số"
        />

        <Field
          ref={confirmPasswordRef}
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
          error={errors.confirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          autoComplete="new-password"
          returnKeyType="done"
          onSubmitEditing={handleConfirmPasswordSubmit}
          leftIcon={<Icon name="lock" size={22} color={colors.textSecondary} />}
          rightIcon={
            <TouchableOpacity
              onPress={onToggleConfirmPassword}
              activeOpacity={0.7}
              style={styles.eyeButton}
              accessibilityLabel={isConfirmPasswordVisible ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'}
              accessibilityRole="button"
              accessible
            >
              <Icon
                name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color={isConfirmPasswordVisible ? colors.primary : colors.textSecondary}
              />
            </TouchableOpacity>
          }
          labelStyle={styles.fieldLabel}
          containerStyle={styles.fieldContainer}
          accessibilityHint="Nhập lại mật khẩu để xác nhận"
        />
      </View>

      <TouchableOpacity
        onPress={onToggleTerms}
        activeOpacity={0.7}
        style={styles.termsRow}
        accessibilityLabel="Đồng ý điều khoản và chính sách bảo mật"
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreedToTerms }}
        accessible
      >
        <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
          {agreedToTerms && (
            <Icon name="check" size={12} color={colors.white} />
          )}
        </View>
        <Text style={styles.termsText}>
          Tôi là phụ huynh/người giám hộ và đồng ý với{' '}
          <Text style={styles.termsLink}>Điều khoản</Text>
          {' '}và{' '}
          <Text style={styles.termsLink}>Chính sách bảo mật</Text>
        </Text>
      </TouchableOpacity>
      {errors.terms && (
        <ErrorText error={errors.terms} style={styles.termsError} />
      )}

      <Button
        title="Tiếp tục"
        onPress={handleConfirmPasswordSubmit}
        loading={isLoading}
        style={styles.button}
        accessibilityLabel="Tiếp tục đăng ký"
        accessibilityRole="button"
        accessible
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: spacing.lg,
  },
  generalError: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  inputGroup: {
    marginBottom: spacing.sm,
  },
  fieldContainer: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  termsError: {
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
  },
});

export default React.memo(RegisterForm);
