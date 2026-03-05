import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegister } from '../hooks/useRegister';
import RegisterForm from '../components/RegisterForm';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const RegisterScreen = ({ navigation }) => {
  const {
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
  } = useRegister();

  useEffect(() => {
    if (registrationDone) {
      navigation.navigate('Otp', { phoneNumber });
    }
  }, [registrationDone, navigation, phoneNumber]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLoginNavigate = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingTitle}>Bắt đầu hành trình khám phá</Text>
              <Text style={styles.headingSubtitle}>
                Học kỹ năng sống qua những tình huống thực tế mỗi ngày!
              </Text>
            </View>

            <View style={styles.formSection}>
              <RegisterForm
                name={name}
                phoneNumber={phoneNumber}
                password={password}
                confirmPassword={confirmPassword}
                isPasswordVisible={isPasswordVisible}
                isConfirmPasswordVisible={isConfirmPasswordVisible}
                agreedToTerms={agreedToTerms}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleRegister}
                onNameChange={handleNameChange}
                onPhoneChange={handlePhoneChange}
                onPasswordChange={handlePasswordChange}
                onConfirmPasswordChange={handleConfirmPasswordChange}
                onTogglePassword={togglePasswordVisibility}
                onToggleConfirmPassword={toggleConfirmPasswordVisibility}
                onToggleTerms={toggleAgreedToTerms}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.loginPromptText}>Đã có tài khoản?</Text>
              <TouchableOpacity
                onPress={handleLoginNavigate}
                activeOpacity={0.7}
                style={styles.loginLink}
                accessibilityLabel="Đăng nhập"
                accessibilityRole="button"
                accessible
              >
                <Text style={styles.loginLinkText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  headingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headingTitle: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
  },
  headingSubtitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  formSection: {
    paddingHorizontal: spacing.lg,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  loginPromptText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  loginLink: {
    marginLeft: spacing.xs,
  },
  loginLinkText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
