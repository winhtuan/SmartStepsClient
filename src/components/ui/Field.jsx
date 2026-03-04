import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Input from './Input';
import ErrorText from './ErrorText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const Field = React.forwardRef(({
  label,
  error,
  containerStyle,
  labelStyle,
  ...inputProps
}, ref) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <Input
        ref={ref}
        hasError={!!error}
        accessibilityLabel={label}
        {...inputProps}
      />
      <ErrorText error={error} />
    </View>
  );
});

Field.displayName = 'Field';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
});

export default React.memo(Field);
