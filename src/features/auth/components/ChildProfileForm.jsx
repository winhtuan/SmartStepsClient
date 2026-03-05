import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Field from '../../../components/ui/Field';
import Button from '../../../components/ui/Button';
import ErrorText from '../../../components/ui/ErrorText';
import BirthDateField from './BirthDateField';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';

const AVATAR_PALETTE = {
  bear: { bg: '#FFF8E1', selectedBg: '#FFECB3', border: '#FFD54F' },
  cat: { bg: '#F3E5F5', selectedBg: '#E1BEE7', border: '#CE93D8' },
  dinosaur: { bg: '#E8F5E9', selectedBg: '#C8E6C9', border: '#81C784' },
  rabbit: { bg: '#E3F2FD', selectedBg: '#BBDEFB', border: '#90CAF9' },
};

const H_INPUT = 56;
const H_GENDER_OPTION = 44;
const AVATAR_CARD_SIZE = 80;
const H_BUTTON = 56;

const ChildProfileForm = ({
  childName,
  birthDate,
  gender,
  selectedAvatar,
  avatarOptions,
  genderOptions,
  errors,
  isLoading,
  onChildNameChange,
  onBirthDateChange,
  onGenderSelect,
  onAvatarSelect,
  onSubmit,
}) => {
  const scaleAnims = useRef({});

  const getScaleAnim = useCallback((id) => {
    if (!scaleAnims.current[id]) {
      scaleAnims.current[id] = new Animated.Value(1);
    }
    return scaleAnims.current[id];
  }, []);

  const handleAvatarPress = useCallback(
    (id) => {
      const anim = getScaleAnim(id);
      Animated.sequence([
        Animated.spring(anim, {
          toValue: 1.12,
          useNativeDriver: true,
          speed: 60,
          bounciness: 10,
        }),
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 60,
          bounciness: 6,
        }),
      ]).start();

      onAvatarSelect(id);
    },
    [getScaleAnim, onAvatarSelect]
  );

  const renderGenderOption = useCallback(
    (option) => {
      const isSelected = gender === option.id;

      return (
        <TouchableOpacity
          key={option.id}
          onPress={() => onGenderSelect(option.id)}
          activeOpacity={0.7}
          style={[
            styles.genderOption,
            isSelected && styles.genderOptionSelected,
          ]}
          accessibilityRole="radio"
          accessibilityState={{ selected: isSelected }}
        >
          <Text
            style={[
              styles.genderText,
              isSelected && styles.genderTextSelected,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [gender, onGenderSelect]
  );

  const renderAvatarCard = useCallback(
    (option) => {
      const isSelected = selectedAvatar === option.id;
      const palette = AVATAR_PALETTE[option.id];
      const scale = getScaleAnim(option.id);

      return (
        <Animated.View
          key={option.id}
          style={{ transform: [{ scale }] }}
        >
          <TouchableOpacity
            onPress={() => handleAvatarPress(option.id)}
            activeOpacity={0.85}
            style={[
              styles.avatarCard,
              {
                backgroundColor: isSelected
                  ? palette.selectedBg
                  : palette.bg,
                borderColor: isSelected
                  ? palette.border
                  : 'transparent',
              },
              isSelected && styles.avatarCardSelected,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={styles.avatarEmoji}>{option.emoji}</Text>
            <Text
              style={[
                styles.avatarLabel,
                isSelected && styles.avatarLabelSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [selectedAvatar, getScaleAnim, handleAvatarPress]
  );

  return (
    <View style={styles.container}>
      {errors?.general && (
        <ErrorText error={errors.general} style={styles.generalError} />
      )}

      {/* Name */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tên của bé</Text>

        <Field
          placeholder="VD: Nguyễn Minh Khoa"
          value={childName}
          onChangeText={onChildNameChange}
          error={errors.childName}
          autoCapitalize="words"
          returnKeyType="done"
          leftIcon={
            <Icon
              name="child"
              size={20}
              color={colors.textSecondary}
            />
          }
          inputStyle={styles.nameInput}
        />
      </View>

      {/* Birth Date */}
      <View style={styles.section}>
        <BirthDateField
          value={birthDate}
          onChange={onBirthDateChange}
          error={errors.birthDate}
        />
      </View>

      {/* Gender */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>
          Giới tính
        </Text>

        <View style={styles.genderRow}>
          {genderOptions.map(renderGenderOption)}
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>
          Chọn avatar cho con
        </Text>

        <View style={styles.avatarGrid}>
          {avatarOptions.map(renderAvatarCard)}
        </View>
      </View>

      {/* Button */}
      <Button
        title="Tiếp tục"
        onPress={onSubmit}
        loading={isLoading}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  generalError: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  section: {
    marginBottom: 10,
  },

  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },

  nameInput: {
    height: H_INPUT,
    borderRadius: 28,
    fontSize: 16,
  },

  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },

  genderOption: {
    flex: 1,
    height: H_GENDER_OPTION,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderInput,
    backgroundColor: colors.surface,
  },

  genderOptionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },

  genderText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  genderTextSelected: {
    color: colors.text,
    fontWeight: '700',
  },

  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },

  avatarCard: {
    width: AVATAR_CARD_SIZE,
    height: AVATAR_CARD_SIZE,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarCardSelected: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  avatarEmoji: {
    fontSize: 34,
  },

  avatarLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  avatarLabelSelected: {
    fontWeight: '700',
    color: colors.text,
  },

  button: {
    marginTop: 28,
    height: H_BUTTON,
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default React.memo(ChildProfileForm);