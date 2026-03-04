import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const Input = React.forwardRef(({
  value,
  onChangeText,
  placeholder,
  hasError,
  style,
  inputStyle,
  inputContainerStyle,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          {...rest}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderInput,
    borderRadius: spacing.xl,
    height: spacing.xxxl,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md, // 16px
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xxl + spacing.sm, // pl-14
  },
  inputWithRightIcon: {
    paddingRight: spacing.xxl + spacing.sm, // pr-14
  },
  inputError: {
    borderColor: colors.error,
  },
  leftIconContainer: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: spacing.md,
    zIndex: 1,
  },
});

export default React.memo(Input);
