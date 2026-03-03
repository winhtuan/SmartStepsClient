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
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreenView = ({ navigation }) => {
  const {
    email,
    setEmail,
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
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.subtitle}>Safe, smart, and confident every day</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleLogin}
                onForgotPassword={handleForgotPassword}
              />

              <View style={styles.footerContainer}>
                <Text style={styles.signUpPrompt}>New to Smart Steps?</Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpButtonText}>Create Account</Text>
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
    paddingTop: 20,
    paddingBottom: 30, // User requested 30px exactly
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  logoWrapper: {
    width: 180, 
    height: 180,
    borderRadius: 90, 
    borderWidth: 4,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
    fontSize: typography.sizes.xxxl, // text-4xl
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg, // text-lg
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  formSection: {
    width: '100%',
    maxWidth: 500, // max-w-md approx
    alignSelf: 'center',
    marginTop: spacing.md,
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
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.xs,
    textDecorationLine: 'underline',
  },
});

export default LoginScreenView;
