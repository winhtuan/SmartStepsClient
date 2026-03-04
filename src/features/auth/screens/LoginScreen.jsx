import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { TouchableOpacity, Image } from 'react-native';
const LoginScreenView = ({ navigation }) => {
  const {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    errors,
    isLoading,
    handleLogin,
  } = useLogin();

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password');
    // navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign Up');
    // navigation.navigate('SignUp');
  };

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
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image source={require('../../../assets/images/logo smartstep-01.png')} style={styles.logo} />
              </View>
              <Text style={styles.title}>Chào mừng!</Text>
              <Text style={styles.subtitle}>An toàn, thông minh và tự tin mỗi ngày</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <LoginForm
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                password={password}
                setPassword={setPassword}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleLogin}
                onForgotPassword={handleForgotPassword}
              />

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} accessibilityLabel="Đăng nhập bằng Facebook">
                  <Image source={require('../../../assets/icons/facebook_logo_icon_147291.png')} style={styles.socialIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} accessibilityLabel="Đăng nhập bằng Google">
                  <Image source={require('../../../assets/icons/googlechrome_103832.png')} style={styles.socialIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.footerContainer}>
                <Text style={styles.signUpPrompt}>Chưa có tài khoản?</Text>
                <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton} activeOpacity={0.7}>
                  <Text style={styles.signUpButtonText}>Đăng ký ngay</Text>
                </TouchableOpacity>
              </View>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  logoWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  logoPlaceholderText: {
    color: colors.textPlaceholder,
    fontWeight: typography.weights.bold,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  formSection: {
    width: '100%',
    maxWidth: 500, // max-w-md approx
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginBottom: spacing.md,
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  signUpPrompt: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginLeft: spacing.sm,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
});

export default LoginScreenView;
