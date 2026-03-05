import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLearningPersonalization } from '../hooks/useLearningPersonalization';
import LearningPersonalizationForm from '../components/LearningPersonalizationForm';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const LearningPersonalizationScreen = ({ navigation }) => {
  const {
    selectedSkills,
    isLoading,
    done,
    skillOptions,
    toggleSkill,
    handleContinue,
    handleSkip,
  } = useLearningPersonalization();

  useEffect(() => {
    if (done) {
      navigation.navigate('RegisterComplete');
    }
  }, [done, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Cá nhân hoá học tập</Text>
            <Text style={styles.subtitle}>
              Bé của bạn nên học những kỹ năng nào?
            </Text>
            <Text style={styles.hint}>Có thể chọn nhiều kỹ năng</Text>
          </View>

          <LearningPersonalizationForm
            selectedSkills={selectedSkills}
            skillOptions={skillOptions}
            isLoading={isLoading}
            onToggleSkill={toggleSkill}
            onContinue={handleContinue}
            onSkip={handleSkip}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 30,
  },
  headingContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.extrabold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  hint: {
    fontSize: typography.sizes.sm,
    color: colors.textPlaceholder,
    marginTop: spacing.xs,
  },
});

export default LearningPersonalizationScreen;
