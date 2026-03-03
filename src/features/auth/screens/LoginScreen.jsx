import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useLogin } from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const LoginScreen = ({ navigation }) => {
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
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Smart Steps</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
            <Text style={styles.description}>Let's get moving together</Text>
          </View>

          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />

          <View style={styles.footerContainer}>
            <Button
              title="Forgot Password?"
              variant="text"
              onPress={handleForgotPassword}
              style={styles.footerButton}
              textStyle={styles.footerButtonText}
            />

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpPrompt}>New to Smart Steps?</Text>
              <Button
                title="Create an account"
                variant="text"
                onPress={handleSignUp}
                style={styles.signUpButton}
                textStyle={styles.signUpButtonText}
              />
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
    padding: spacing.lg,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerButton: {
    marginBottom: spacing.lg,
  },
  footerButtonText: {
    fontWeight: typography.weights.medium,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpPrompt: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  signUpButton: {
    marginLeft: spacing.xs,
  },
  signUpButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
});

export default LoginScreen;
