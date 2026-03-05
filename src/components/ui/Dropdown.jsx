import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/FontAwesome';

const ITEM_HEIGHT = 52;

const DropdownItem = React.memo(({ item, isSelected, onSelect }) => {
  const handlePress = useCallback(() => onSelect(item), [item, onSelect]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.option, isSelected && styles.optionSelected]}
      activeOpacity={0.6}
      accessibilityLabel={item.label}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected }}
      accessible
    >
      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
        {item.label}
      </Text>
      {isSelected && (
        <Icon name="check" size={14} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
});

DropdownItem.displayName = 'DropdownItem';

const Dropdown = ({
  value,
  options,
  placeholder,
  onSelect,
  hasError = false,
  accessibilityLabel,
  disabled = false,
  style,
  triggerTextStyle,
  iconSize = 11,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? null;

  const open = useCallback(() => {
    if (!disabled) setVisible(true);
  }, [disabled]);

  const close = useCallback(() => setVisible(false), []);

  const handleSelect = useCallback(
    (item) => {
      onSelect(item.value);
      close();
    },
    [onSelect, close],
  );

  const keyExtractor = useCallback((item) => String(item.value), []);

  const renderItem = useCallback(
    ({ item }) => (
      <DropdownItem
        item={item}
        isSelected={item.value === value}
        onSelect={handleSelect}
      />
    ),
    [value, handleSelect],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <>
      <TouchableOpacity
        onPress={open}
        disabled={disabled}
        activeOpacity={0.8}
        style={[
          styles.trigger,
          style,                              // base overrides (height, radius, bg)
          visible && styles.triggerFocused,   // state overrides on top
          hasError && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: visible, disabled }}
        accessible
      >
        <Text
          style={[
            styles.triggerText,
            !selectedLabel && styles.placeholderText,
            triggerTextStyle,
          ]}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </Text>
        <Icon
          name={visible ? 'chevron-up' : 'chevron-down'}
          size={iconSize}
          color={visible ? colors.primary : colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.backdrop}
          onPress={close}
          activeOpacity={1}
          accessibilityLabel="Đóng danh sách"
          accessibilityRole="button"
          accessible
        >
          <View
            style={styles.sheet}
            onStartShouldSetResponder={() => true}
          >
            <FlatList
              data={options}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
              showsVerticalScrollIndicator={false}
              initialNumToRender={12}
              maxToRenderPerBatch={20}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderInput,
    borderRadius: spacing.xl,
    height: spacing.xxxl,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  triggerFocused: {
    borderColor: colors.borderFocus,
  },
  triggerError: {
    borderColor: colors.error,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  placeholderText: {
    color: colors.textPlaceholder,
    fontWeight: typography.weights.regular,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  sheet: {
    width: '100%',
    maxHeight: 320,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ITEM_HEIGHT,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.regular,
  },
  optionTextSelected: {
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
});

export default React.memo(Dropdown);
