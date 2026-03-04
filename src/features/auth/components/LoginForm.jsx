import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import Field from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { colors } from '../../../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginForm = ({
  phoneNumber,
  setPhoneNumber,
  password,
  setPassword,
  errors,
  isLoading,
  onSubmit,
  onForgotPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef(null);

  const handlePhoneSubmit = () => {
    passwordRef.current?.focus();
  };

  const handlePasswordSubmit = () => {
    Keyboard.dismiss();
    onSubmit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {errors.general && (
          <ErrorText error={errors.general} style={styles.generalError} />
        )}
      </View>
      
      <View style={styles.inputGroup}>
        <Field
          label="Số điện thoại"
          placeholder="Nhập số điện thoại của bạn"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={errors.phoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoComplete="tel"
          returnKeyType="next"
          onSubmitEditing={handlePhoneSubmit}
          blurOnSubmit={false}
          leftIcon={<Icon name="phone" size={24} color={colors.textSecondary} />}
          labelStyle={styles.fieldLabel}
          containerStyle={styles.fieldContainer}
        />
        
        <Field
          ref={passwordRef}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry={!isPasswordVisible}
          autoComplete="password"
          returnKeyType="done"
          onSubmitEditing={handlePasswordSubmit}
          leftIcon={<Icon name="lock" size={24} color={colors.textSecondary} />}
          rightIcon={
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.7}
              style={styles.eyeButton}
              accessibilityLabel={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
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
        />
      </View>
      
      <View style={styles.actionGroup}>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Đăng nhập"
          onPress={handlePasswordSubmit}
          loading={isLoading}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: spacing.lg,
  },
  headerContainer: {
    minHeight: 24,
    marginBottom: spacing.xs,
  },
  generalError: {
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.sm,
  },
  fieldContainer: {
    marginBottom: spacing.md,
  },
  actionGroup: {
    marginTop: spacing.xs,
  },
  button: {
    marginTop: spacing.sm,
    height: 56,
    borderRadius: 12,
  },
  fieldLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xs,
  },
  iconPlaceholder: {
    fontSize: typography.sizes.xxl,
    opacity: 0.5,
  },
  buttonIcon: {
    fontSize: typography.sizes.xxl,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: spacing.md,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    textDecorationLine: 'underline',
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(LoginForm);
