import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const RegisterCompleteScreen = ({ navigation }) => {
  const handleStartLearning = useCallback(() => {
    // TODO: Navigate to Home/Main when MainNavigator is ready
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.illustration}>🎉</Text>
          <Text style={styles.title}>Hoàn tất đăng ký!</Text>
          <Text style={styles.message}>
            Hồ sơ của bé đã sẵn sàng.{'\n'}
            Bắt đầu hành trình học tập ngay thôi!
          </Text>
        </View>

        <Button
          title="Bắt đầu học"
          onPress={handleStartLearning}
          style={styles.button}
          accessibilityLabel="Bắt đầu học"
          accessibilityRole="button"
          accessible
        />
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
    paddingBottom: spacing.xxl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  illustration: {
    fontSize: 80,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  button: {
    width: '100%',
  },
});

export default RegisterCompleteScreen;
