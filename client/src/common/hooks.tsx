import { Ref, useCallback, useEffect, useRef, useState } from "react"

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

type UseIntervalConfig = Readonly<{
  immediate?: boolean
}>

export function useInterval(callback: () => {}, ms: number, config?: UseIntervalConfig): void {
  const immediate = config?.immediate ?? false

  useEffect(() => {
    if (immediate) {
      callback()
    }

    const id = setInterval(callback, ms)
    return () => {
      clearInterval(id)
    }
  }, [callback, immediate, ms])
}

export function useOnMount(callback: () => void): void {
  useEffect(() => {
    callback()
  }, [callback])
}

export function useOnUnmount(callback: () => void): void {
  useEffect(() => {
    return () => {
      callback()
    }
  }, [callback])
}

export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}

export function useSingleton<T>(factory: () => T): T {
  const instanceRef = useRef<T | null>(null)
  if (instanceRef.current == null) {
    instanceRef.current = factory()
  }

  return instanceRef.current
}

export function useOnFirstRender(callback: () => void): void {
  const hasRendered = useRef(false)
  if (hasRendered.current) {
    return
  }

  callback()
  hasRendered.current = true
}
