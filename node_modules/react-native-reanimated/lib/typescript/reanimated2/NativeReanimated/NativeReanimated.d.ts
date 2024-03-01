import type { ShareableRef, Value3D, ValueRotation } from '../commonTypes';
import type { LayoutAnimationFunction, LayoutAnimationType } from '../layoutReanimation';
import type { WorkletRuntime } from '../runtimes';
import type { LayoutAnimationBatchItem } from '../layoutReanimation/animationBuilder/commonTypes';
export interface NativeReanimatedModule {
    makeShareableClone<T>(value: T, shouldPersistRemote: boolean): ShareableRef<T>;
    scheduleOnUI<T>(shareable: ShareableRef<T>): void;
    executeOnUIRuntimeSync<T, R>(shareable: ShareableRef<T>): R;
    createWorkletRuntime(name: string, initializer: ShareableRef<() => void>): WorkletRuntime;
    scheduleOnRuntime<T>(workletRuntime: WorkletRuntime, worklet: ShareableRef<T>): void;
    registerEventHandler<T>(eventHandler: ShareableRef<T>, eventName: string, emitterReactTag: number): number;
    unregisterEventHandler(id: number): void;
    getViewProp<T>(viewTag: number, propName: string, callback?: (result: T) => void): Promise<T>;
    enableLayoutAnimations(flag: boolean): void;
    registerSensor(sensorType: number, interval: number, iosReferenceFrame: number, handler: ShareableRef<(data: Value3D | ValueRotation) => void>): number;
    unregisterSensor(sensorId: number): void;
    configureProps(uiProps: string[], nativeProps: string[]): void;
    subscribeForKeyboardEvents(handler: ShareableRef<number>, isStatusBarTranslucent: boolean): number;
    unsubscribeFromKeyboardEvents(listenerId: number): void;
    configureLayoutAnimation(viewTag: number, type: LayoutAnimationType, sharedTransitionTag: string, config: ShareableRef<Keyframe | LayoutAnimationFunction>): void;
    configureLayoutAnimationBatch(layoutAnimationsBatch: {
        viewTag: number;
        type: LayoutAnimationType;
        config: ShareableRef<Keyframe | LayoutAnimationFunction> | undefined;
    }[]): void;
    setShouldAnimateExitingForTag(viewTag: number, shouldAnimate: boolean): void;
}
export declare class NativeReanimated {
    private InnerNativeModule;
    constructor();
    makeShareableClone<T>(value: T, shouldPersistRemote: boolean): ShareableRef<T>;
    scheduleOnUI<T>(shareable: ShareableRef<T>): void;
    executeOnUIRuntimeSync<T, R>(shareable: ShareableRef<T>): R;
    createWorkletRuntime(name: string, initializer: ShareableRef<() => void>): WorkletRuntime;
    scheduleOnRuntime<T>(workletRuntime: WorkletRuntime, shareableWorklet: ShareableRef<T>): void;
    registerSensor(sensorType: number, interval: number, iosReferenceFrame: number, handler: ShareableRef<(data: Value3D | ValueRotation) => void>): number;
    unregisterSensor(sensorId: number): void;
    registerEventHandler<T>(eventHandler: ShareableRef<T>, eventName: string, emitterReactTag: number): number;
    unregisterEventHandler(id: number): void;
    getViewProp<T>(viewTag: number, propName: string, callback?: (result: T) => void): Promise<T>;
    configureLayoutAnimation(viewTag: number, type: LayoutAnimationType, sharedTransitionTag: string, config: ShareableRef<Keyframe | LayoutAnimationFunction>): void;
    configureLayoutAnimationBatch(layoutAnimationsBatch: LayoutAnimationBatchItem[]): void;
    setShouldAnimateExitingForTag(viewTag: number, shouldAnimate: boolean): void;
    enableLayoutAnimations(flag: boolean): void;
    configureProps(uiProps: string[], nativeProps: string[]): void;
    subscribeForKeyboardEvents(handler: ShareableRef<number>, isStatusBarTranslucent: boolean): number;
    unsubscribeFromKeyboardEvents(listenerId: number): void;
}
