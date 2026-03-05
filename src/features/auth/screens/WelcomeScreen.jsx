import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const WelcomeScreen = ({ navigation }) => {
  const handleCreateAccount = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../../assets/images/logo smartstep-01.png')}
              style={styles.logo}
              accessibilityLabel="SmartSteps logo"
            />
          </View>
          <Text style={styles.title}>SmartSteps</Text>
          <Text style={styles.subtitle}>
            Ứng dụng giúp trẻ học kỹ năng sống qua các tình huống thực tế
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Tạo tài khoản"
            onPress={handleCreateAccount}
            style={styles.createButton}
            accessibilityLabel="Tạo tài khoản mới"
            accessibilityRole="button"
            accessible
          />
          <Button
            title="Đăng nhập"
            variant="outline"
            onPress={handleLogin}
            style={styles.loginButton}
            accessibilityLabel="Đăng nhập tài khoản"
            accessibilityRole="button"
            accessible
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.xxl,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  buttonSection: {
    gap: spacing.md,
  },
  createButton: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
  },
});

export default WelcomeScreen;
