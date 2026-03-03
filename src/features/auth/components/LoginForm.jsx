import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Field from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { colors } from '../../../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  isLoading,
  onSubmit,
  onForgotPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {errors.general && (
        <ErrorText error={errors.general} style={styles.generalError} />
      )}
      
      <Field
        label="Email Address"
        placeholder="name@email.com"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        leftIcon={<Icon name="envelope-o" size={24} color={colors.textSecondary} />}
        labelStyle={styles.fieldLabel}
      />
      
      <Field
        label="Password"
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry={!isPasswordVisible}
        autoComplete="password"
        leftIcon={<Icon name="lock" size={24} color={colors.textSecondary} />}
        rightIcon={
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} activeOpacity={0.7}>
            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        }
        labelStyle={styles.fieldLabel}
      />
      
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Sign In"
        onPress={onSubmit}
        loading={isLoading}
        style={styles.button}
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
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.md,
  },
  fieldLabel: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    paddingHorizontal: spacing.xs,
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
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    textDecorationLine: 'underline',
  }
});

export default React.memo(LoginForm);
