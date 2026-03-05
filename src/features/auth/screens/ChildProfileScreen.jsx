import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChildProfile } from '../hooks/useChildProfile';
import ChildProfileForm from '../components/ChildProfileForm';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChildProfileScreen = ({ navigation }) => {
  const {
    childName,
    birthDate,
    gender,
    selectedAvatar,
    errors,
    isLoading,
    profileDone,
    avatarOptions,
    genderOptions,
    handleChildNameChange,
    handleBirthDateChange,
    handleGenderSelect,
    handleAvatarSelect,
    handleSave,
  } = useChildProfile();

  useEffect(() => {
    if (profileDone) {
      navigation.navigate('LearningPersonalization');
    }
  }, [profileDone, navigation]);

  const handleBack = useCallback(() => {
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
          {/* Floating back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Quay lại"
            accessibilityRole="button"
            accessible
          >
            <Icon name="arrow-left" size={18} color={colors.text} />
          </TouchableOpacity>

          {/* Playful header */}
          <View style={styles.header}>
            <View style={styles.illustrationWrapper}>
              {(() => {
                const active = selectedAvatar
                  ? avatarOptions.find((a) => a.id === selectedAvatar)
                  : null;
                if (!active || active.image) {
                  return (
                    <Image
                      source={active?.image ?? require('../../../assets/images/baby-1.png')}
                      style={styles.illustrationImage}
                    />
                  );
                }
                return (
                  <Text style={styles.illustrationEmoji}>{active.emoji}</Text>
                );
              })()}
            </View>
            <Text style={styles.title}>Hồ sơ của bé</Text>
            <Text style={styles.subtitle}>
              Hãy cho chúng tôi biết thêm về con bạn!
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <ChildProfileForm
              childName={childName}
              birthDate={birthDate}
              gender={gender}
              selectedAvatar={selectedAvatar}
              avatarOptions={avatarOptions}
              genderOptions={genderOptions}
              errors={errors}
              isLoading={isLoading}
              onChildNameChange={handleChildNameChange}
              onBirthDateChange={handleBirthDateChange}
              onGenderSelect={handleGenderSelect}
              onAvatarSelect={handleAvatarSelect}
              onSubmit={handleSave}
            />
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Back button — circular, soft
  backButton: {
    width: spacing.xl + spacing.md,   // 48dp
    height: spacing.xl + spacing.md,  // 48dp
    borderRadius: spacing.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  // Duolingo-style centered playful header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl + spacing.sm, // ~40dp
  },
  illustrationWrapper: {
    width: spacing.xxxl + spacing.xl,      // 96dp
    height: spacing.xxxl + spacing.xl,     // 96dp
    borderRadius: spacing.xxl,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  illustrationImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  illustrationEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Form
  formSection: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
});

export default ChildProfileScreen;
