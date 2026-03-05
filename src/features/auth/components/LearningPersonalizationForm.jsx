import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import Icon from 'react-native-vector-icons/FontAwesome';

const LearningPersonalizationForm = ({
  selectedSkills,
  skillOptions,
  isLoading,
  onToggleSkill,
  onContinue,
  onSkip,
}) => {
  const renderSkillOption = useCallback((option) => {
    const isSelected = selectedSkills.includes(option.id);
    return (
      <TouchableOpacity
        key={option.id}
        onPress={() => onToggleSkill(option.id)}
        activeOpacity={0.7}
        style={[styles.skillOption, isSelected && styles.skillOptionSelected]}
        accessibilityLabel={option.label}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isSelected }}
        accessible
      >
        <View style={[styles.skillCheck, isSelected && styles.skillCheckSelected]}>
          {isSelected && <Icon name="check" size={12} color={colors.white} />}
        </View>
        <Text style={[styles.skillLabel, isSelected && styles.skillLabelSelected]}>
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedSkills, onToggleSkill]);

  return (
    <View style={styles.container}>
      <View style={styles.skillList}>
        {skillOptions.map(renderSkillOption)}
      </View>

      <Button
        title="Tiếp tục"
        onPress={onContinue}
        loading={isLoading}
        style={styles.continueButton}
        accessibilityLabel="Tiếp tục với kỹ năng đã chọn"
        accessibilityRole="button"
        accessible
      />

      <TouchableOpacity
        onPress={onSkip}
        activeOpacity={0.7}
        style={styles.skipButton}
        accessibilityLabel="Bỏ qua bước này"
        accessibilityRole="button"
        accessible
      >
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  skillList: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  skillOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderInput,
    backgroundColor: colors.white,
    gap: spacing.md,
  },
  skillOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  skillCheck: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillCheckSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skillLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  skillLabelSelected: {
    color: colors.text,
    fontWeight: typography.weights.bold,
  },
  continueButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
});

export default React.memo(LearningPersonalizationForm);
