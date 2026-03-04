import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const Button = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'outline' | 'text'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const getContainerStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.containerOutline;
      case 'text':
        return styles.containerText;
      case 'primary':
      default:
        return styles.containerPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
      case 'text':
        return styles.textOutline;
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.sizeSm;
      case 'lg':
        return styles.sizeLg;
      case 'md':
      default:
        return styles.sizeMd;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        getContainerStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          color={isPrimary ? colors.white : colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[styles.text, getTextStyle(), textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.sm,
  },
  containerPrimary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  containerOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  containerText: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  sizeSm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sizeMd: {
    height: 80, // h-20
    paddingHorizontal: spacing.xl,
    borderRadius: 16, // rounded-xl
  },
  sizeLg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  text: {
    fontSize: typography.sizes.xxl, // text-2xl
    fontWeight: typography.weights.extrabold,
    textAlign: 'center',
  },
  textPrimary: {
    color: colors.text, // text-slate-900 per Figma
  },
  textOutline: {
    color: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});

export default React.memo(Button);
