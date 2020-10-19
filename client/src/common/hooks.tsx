import { Ref, useCallback } from "react"

export function useMergedRef<ForwardRef, LocalRef extends ForwardRef>(
  forwardedRef: React.Ref<ForwardRef>,
  localRef: React.Ref<LocalRef>,
): (instance: LocalRef | null) => void {
  function setRefs<T>(ref: Ref<T>, value: T) {
    if (typeof ref === "function") {
      ref(value)
    } else if (ref) {
      ;(ref as any).current = value
    }
  }

  return useCallback(
    (value) => {
      setRefs(forwardedRef, value)
      setRefs(localRef, value)
    },
    [forwardedRef, localRef],
  )
}
