'use strict';

import { shouldBeUseWeb } from './PlatformChecker';
import { configureLayoutAnimationBatch, makeShareableCloneRecursive } from './core';
function createUpdateManager() {
  const animations = [];
  return {
    update(batchItem) {
      animations.push(batchItem);
      if (animations.length === 1) {
        setImmediate(this.flush);
      }
    },
    flush() {
      configureLayoutAnimationBatch(animations);
      animations.length = 0;
    }
  };
}
export let updateLayoutAnimations;
if (shouldBeUseWeb()) {
  updateLayoutAnimations = () => {
    // no-op
  };
} else {
  const updateLayoutAnimationsManager = createUpdateManager();
  updateLayoutAnimations = (viewTag, type, config) => updateLayoutAnimationsManager.update({
    viewTag,
    type,
    config: config ? makeShareableCloneRecursive(config) : undefined
  });
}
//# sourceMappingURL=UpdateLayoutAnimations.js.map