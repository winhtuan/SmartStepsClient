import React from 'react';
import { StyleSheet, View } from 'react-native';
import Field from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import { spacing } from '../../../theme/spacing';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  isLoading,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      {errors.general && (
        <ErrorText error={errors.general} style={styles.generalError} />
      )}
      
      <Field
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <Field
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry
        autoComplete="password"
      />
      
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
  },
  generalError: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.md,
  },
});

export default React.memo(LoginForm);
