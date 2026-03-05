import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOtp } from '../hooks/useOtp';
import OtpForm from '../components/OtpForm';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import Icon from 'react-native-vector-icons/FontAwesome';

const OtpScreen = ({ navigation, route }) => {
  const phoneNumber = route?.params?.phoneNumber ?? '';

  const {
    otp,
    errors,
    isLoading,
    verificationDone,
    countdown,
    canResend,
    handleOtpChange,
    handleResend,
    handleVerify,
  } = useOtp(phoneNumber);

  useEffect(() => {
    if (verificationDone) {
      navigation.navigate('ChildProfile');
    }
  }, [verificationDone, navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
          accessible
        >
          <Icon name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Xác thực số điện thoại</Text>
          <Text style={styles.subtitle}>
            Kiểm tra tin nhắn SMS của bạn
          </Text>

          <OtpForm
            otp={otp}
            phoneNumber={phoneNumber}
            errors={errors}
            isLoading={isLoading}
            countdown={countdown}
            canResend={canResend}
            onOtpChange={handleOtpChange}
            onResend={handleResend}
            onVerify={handleVerify}
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
    paddingTop: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
});

export default OtpScreen;
