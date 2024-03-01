'use strict';

import { useEffect, useRef } from 'react';
import { findNodeHandle } from 'react-native';
import { useEvent } from './useEvent';
import { useSharedValue } from './useSharedValue';
const scrollEventNames = ['onScroll', 'onScrollBeginDrag', 'onScrollEndDrag', 'onMomentumScrollBegin', 'onMomentumScrollEnd'];

/**
 * Lets you synchronously get the current offset of a `ScrollView`.
 *
 * @param animatedRef - An [animated ref](https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedRef) attached to an Animated.ScrollView component.
 * @returns A shared value which holds the current offset of the `ScrollView`.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/scroll/useScrollViewOffset
 */
export function useScrollViewOffset(animatedRef, initialRef) {
  const offsetRef = useRef(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  initialRef !== undefined ? initialRef : useSharedValue(0));
  const eventHandler = useEvent(event => {
    'worklet';

    offsetRef.current.value = event.contentOffset.x === 0 ? event.contentOffset.y : event.contentOffset.x;
  }, scrollEventNames
  // Read https://github.com/software-mansion/react-native-reanimated/pull/5056
  // for more information about this cast.
  );

  useEffect(() => {
    var _eventHandler$current;
    const viewTag = findNodeHandle(animatedRef.current);
    (_eventHandler$current = eventHandler.current) === null || _eventHandler$current === void 0 ? void 0 : _eventHandler$current.registerForEvents(viewTag);
    return () => {
      var _eventHandler$current2;
      (_eventHandler$current2 = eventHandler.current) === null || _eventHandler$current2 === void 0 ? void 0 : _eventHandler$current2.unregisterFromEvents();
    };
  }, [animatedRef.current]);
  return offsetRef.current;
}
//# sourceMappingURL=useScrollViewOffset.js.map