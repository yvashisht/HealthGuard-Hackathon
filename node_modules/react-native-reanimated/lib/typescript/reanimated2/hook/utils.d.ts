import type { WorkletFunction } from '../commonTypes';
import type { DependencyList } from './commonTypes';
export declare function buildWorkletsHash(worklets: Record<string, WorkletFunction> | WorkletFunction[]): string;
export declare function buildDependencies(dependencies: DependencyList, handlers: Record<string, WorkletFunction | undefined>): unknown[];
export declare function areDependenciesEqual(nextDependencies: DependencyList, prevDependencies: DependencyList): boolean;
export declare function isAnimated(prop: unknown): boolean;
export declare function shallowEqual<T extends Record<string | number | symbol, unknown>>(a: T, b: T): boolean;
export declare function validateAnimatedStyles(styles: unknown[] | object): void;
