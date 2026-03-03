import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const ErrorText = ({ error, style, ...rest }) => {
  if (!error) return null;

  return (
    <Text 
      style={[styles.errorText, style]} 
      accessibilityRole="alert"
      {...rest}
    >
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
});

export default React.memo(ErrorText);
