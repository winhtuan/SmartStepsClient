import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import WheelPicker from '../../../components/ui/WheelPicker';
import ErrorText from '../../../components/ui/ErrorText';
import Button from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import Icon from 'react-native-vector-icons/FontAwesome';

// ─── Design tokens ────────────────────────────────────────────────────────────
const FIELD_BG = '#F3F4F6';     // neutral-100
const FIELD_BORDER = '#E5E7EB'; // neutral-200
const ICON_COLOR = '#6B7280';   // neutral-500

// ─── Date bounds ──────────────────────────────────────────────────────────────
const TODAY = new Date();
const MAX_DATE_YEAR = TODAY.getFullYear();
const MIN_DATE_YEAR = TODAY.getFullYear() - 18;
// Default picker position: ~6 years old
const DEFAULT_YEAR = TODAY.getFullYear() - 6;
const DEFAULT_MONTH = TODAY.getMonth() + 1;
const DEFAULT_DAY = TODAY.getDate();

// ─── Static option arrays ─────────────────────────────────────────────────────
const MONTH_DATA = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Th.${i + 1}`,
}));

const YEAR_DATA = Array.from(
  { length: MAX_DATE_YEAR - MIN_DATE_YEAR + 1 },
  (_, i) => {
    const y = MAX_DATE_YEAR - i;
    return { value: y, label: String(y) };
  },
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};

// ─── Component ────────────────────────────────────────────────────────────────
const BirthDateField = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);

  // Temporary picker state — committed only on confirm
  const [tempDay, setTempDay] = useState(
    value ? value.getDate() : DEFAULT_DAY,
  );
  const [tempMonth, setTempMonth] = useState(
    value ? value.getMonth() + 1 : DEFAULT_MONTH,
  );
  const [tempYear, setTempYear] = useState(
    value ? value.getFullYear() : DEFAULT_YEAR,
  );

  // Modal open/close animation: opacity 0→1, scale 0.95→1, 180ms
  const animValue = useRef(new Animated.Value(0)).current;

  const openModal = useCallback(() => {
    // Sync temp state to current value each time modal opens
    const d = value ?? new Date(DEFAULT_YEAR, DEFAULT_MONTH - 1, DEFAULT_DAY);
    setTempDay(d.getDate());
    setTempMonth(d.getMonth() + 1);
    setTempYear(d.getFullYear());
    setOpen(true);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [value, animValue]);

  const closeModal = useCallback(
    (onDone) => {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 120,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setOpen(false);
        onDone?.();
      });
    },
    [animValue],
  );

  const handleCancel = useCallback(() => closeModal(), [closeModal]);

  const handleConfirm = useCallback(() => {
    closeModal(() => {
      // Clamp day to valid range for the selected month/year
      const maxDay = getDaysInMonth(tempMonth, tempYear);
      const safeDay = Math.min(tempDay, maxDay);
      onChange(new Date(tempYear, tempMonth - 1, safeDay));
    });
  }, [closeModal, tempDay, tempMonth, tempYear, onChange]);

  // Day options — depend on selected month/year
  const daysInMonth = getDaysInMonth(tempMonth, tempYear);
  const dayData = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    [daysInMonth],
  );

  // Clamp tempDay when month/year causes the current day to become invalid
  useEffect(() => {
    if (tempDay > daysInMonth) {
      setTempDay(daysInMonth);
    }
  }, [tempDay, daysInMonth]);

  const sheetStyle = {
    opacity: animValue,
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      },
    ],
  };

  const hasError = !!error;
  const displayText = value ? formatDate(value) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ngày sinh</Text>

      {/* ── Tappable field ───────────────────────────────────────────── */}
      <TouchableOpacity
        onPress={openModal}
        activeOpacity={0.7}
        style={[styles.field, hasError && styles.fieldError]}
        accessibilityLabel="Ngày sinh của bé"
        accessibilityRole="button"
        accessibilityHint="Nhấn để chọn ngày sinh"
        accessible
      >
        <Text style={[styles.fieldText, !displayText && styles.placeholder]}>
          {displayText ?? 'DD / MM / YYYY'}
        </Text>
        <Icon name="chevron-down" size={18} color={ICON_COLOR} />
      </TouchableOpacity>

      <ErrorText error={error} />

      {/* ── Wheel picker modal ───────────────────────────────────────── */}
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={handleCancel}
        statusBarTranslucent
      >
        {/* Backdrop container — centers the sheet */}
        <View style={styles.backdrop}>
          {/* Invisible tap target fills the backdrop; sibling to sheet so
              it never steals the scroll responder from WheelPicker's FlatList */}
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={handleCancel}
            activeOpacity={1}
            accessibilityLabel="Đóng bộ chọn ngày"
            accessibilityRole="button"
            accessible
          />

          {/* Sheet — sibling to backdrop overlay, not nested inside it */}
          <Animated.View style={[styles.sheet, sheetStyle]}>
            {/* Title */}
            <Text style={styles.title}>Chọn ngày sinh</Text>

            {/* Three wheels */}
            <View style={styles.pickersRow}>
              {/* Day — key forces remount when available days change */}
              <WheelPicker
                key={`day-${daysInMonth}`}
                data={dayData}
                selectedValue={Math.min(tempDay, daysInMonth)}
                onValueChange={setTempDay}
                style={styles.dayWheel}
              />

              <WheelPicker
                data={MONTH_DATA}
                selectedValue={tempMonth}
                onValueChange={setTempMonth}
                style={styles.monthWheel}
              />

              <WheelPicker
                data={YEAR_DATA}
                selectedValue={tempYear}
                onValueChange={setTempYear}
                style={styles.yearWheel}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <Button
                title="Huỷ"
                variant="outline"
                onPress={handleCancel}
                style={styles.cancelButton}
                textStyle={styles.buttonText}
                accessibilityLabel="Huỷ chọn ngày"
                accessibilityRole="button"
                accessible
              />
              <Button
                title="Xác nhận"
                onPress={handleConfirm}
                style={styles.confirmButton}
                textStyle={styles.buttonText}
                accessibilityLabel="Xác nhận ngày sinh"
                accessibilityRole="button"
                accessible
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ── Field ────────────────────────────────────────────────────────────
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md, // 16sp
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,      // 8dp
  },
  field: {
    height: 52,
    borderRadius: 26,
    backgroundColor: FIELD_BG,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingLeft: spacing.md,                // 16dp
    paddingRight: spacing.sm + spacing.xs,  // 12dp
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldError: {
    borderColor: colors.error,
    backgroundColor: colors.surface,
  },
  fieldText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  placeholder: {
    color: '#9CA3AF', // neutral-400
    fontWeight: '400',
  },

  // ── Modal ────────────────────────────────────────────────────────────
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  sheet: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },

  // ── Title ────────────────────────────────────────────────────────────
  title: {
    fontSize: typography.sizes.lg,       // 18sp
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,            // 16dp title → picker
  },

  // ── Pickers row ──────────────────────────────────────────────────────
  pickersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg + spacing.xs, // 20dp picker → buttons (lg=24, -xs=4 → 20)
  },
  dayWheel: {
    flex: 1,    // ~25%
  },
  monthWheel: {
    flex: 1.6,  // ~40%
  },
  yearWheel: {
    flex: 1.4,  // ~35%
  },

  // ── Buttons ──────────────────────────────────────────────────────────
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.lg + spacing.xs, // 20dp gap between buttons (lg=24-xs=4=20)
  },
  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
  },
  confirmButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: typography.sizes.md, // 16px, down from 24px
  },
});

export default React.memo(BirthDateField);
