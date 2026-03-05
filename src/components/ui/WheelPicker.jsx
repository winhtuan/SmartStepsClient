/**
 * WheelPicker — iOS-style vertical scroll wheel selector.
 *
 * Architecture:
 * - Pads data with PAD_COUNT invisible items at top/bottom so first and
 *   last real items can be centered.
 * - snapToInterval keeps scroll snapped to item boundaries.
 * - scrollOffset = dataIndex * ITEM_HEIGHT → item is centered.
 * - Selection indicator: two 1dp lines at the center row boundaries,
 *   rendered as an absolute overlay with pointerEvents="none".
 */
import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export const ITEM_HEIGHT = 52;
export const VISIBLE_COUNT = 5;
const PAD_COUNT = Math.floor(VISIBLE_COUNT / 2); // 2
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_COUNT; // 260

// Neutral palette — design system values, not in app theme
const COLOR_SELECTED_TEXT = '#111827';   // neutral-900
const COLOR_UNSELECTED_TEXT = '#9CA3AF'; // neutral-400
const COLOR_INDICATOR = '#E5E7EB';       // neutral-200

const WheelPickerItem = React.memo(({ label, isSelected }) => (
  <View style={styles.item}>
    <Text
      style={[styles.itemText, isSelected && styles.selectedText]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
));

WheelPickerItem.displayName = 'WheelPickerItem';

const WheelPicker = ({ data, selectedValue, onValueChange, style }) => {
  const flatListRef = useRef(null);

  const getDataIndex = useCallback(
    (value) => {
      const i = data.findIndex((item) => item.value === value);
      return i >= 0 ? i : 0;
    },
    [data],
  );

  const [activeIndex, setActiveIndex] = useState(() =>
    getDataIndex(selectedValue),
  );

  // Prepend/append PAD_COUNT transparent items so first/last real items
  // can scroll to center. Each pad has a unique key so FlatList is stable.
  const paddedData = useMemo(
    () => [
      ...Array.from({ length: PAD_COUNT }, (_, i) => ({
        _key: `__top_${i}`,
        _pad: true,
        label: '',
        value: null,
      })),
      ...data,
      ...Array.from({ length: PAD_COUNT }, (_, i) => ({
        _key: `__bot_${i}`,
        _pad: true,
        label: '',
        value: null,
      })),
    ],
    [data],
  );

  // Scroll to initial selected value after first render.
  useEffect(() => {
    const idx = getDataIndex(selectedValue);
    setActiveIndex(idx);
    // Delay to ensure FlatList has laid out before scrolling.
    const t = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: idx * ITEM_HEIGHT,
        animated: false,
      });
    }, 50);
    return () => clearTimeout(t);
    // Run only on mount — parent uses `key` prop to force remount if data changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollEnd = useCallback(
    (e) => {
      const rawOffset = e.nativeEvent.contentOffset.y;
      const idx = Math.round(rawOffset / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(idx, data.length - 1));

      // Snap to exact boundary in case onScrollEndDrag fires mid-snap.
      flatListRef.current?.scrollToOffset({
        offset: clamped * ITEM_HEIGHT,
        animated: false,
      });

      setActiveIndex(clamped);
      onValueChange(data[clamped].value);
    },
    [data, onValueChange],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      if (item._pad) return <View style={styles.item} />;
      const dataIndex = index - PAD_COUNT;
      return (
        <WheelPickerItem
          label={item.label}
          isSelected={dataIndex === activeIndex}
        />
      );
    },
    [activeIndex],
  );

  const keyExtractor = useCallback(
    (item, index) => item._key ?? `${item.value}_${index}`,
    [],
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
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={paddedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled
      />

      {/* Selection indicator — absolute overlay, passes all touches through */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={styles.indicatorTop} />
        <View style={styles.indicatorBottom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PICKER_HEIGHT,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  itemText: {
    fontSize: 16,
    color: COLOR_UNSELECTED_TEXT,
    textAlign: 'center',
  },
  selectedText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLOR_SELECTED_TEXT,
  },
  // Top indicator line — sits at the top edge of the center row
  indicatorTop: {
    position: 'absolute',
    top: ITEM_HEIGHT * PAD_COUNT, // 2 * 52 = 104
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLOR_INDICATOR,
  },
  // Bottom indicator line — sits at the bottom edge of the center row
  indicatorBottom: {
    position: 'absolute',
    top: ITEM_HEIGHT * (PAD_COUNT + 1), // 3 * 52 = 156
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLOR_INDICATOR,
  },
});

export default React.memo(WheelPicker);
