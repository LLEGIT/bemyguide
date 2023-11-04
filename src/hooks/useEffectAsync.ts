import { DependencyList, useEffect } from "react";

export function useEffectAsync(
  effect: () => Promise<any>,
  deps?: DependencyList
): void {
  useEffect(() => {
    effect();
  }, deps);
}
