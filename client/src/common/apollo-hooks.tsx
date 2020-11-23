import { FetchResult, MutationFunctionOptions, MutationResult, MutationTuple } from "@apollo/client"
import { useCallback, useEffect, useMemo, useState } from "react"

export function useResetMutation<TData, TVariables>(
  tuple: MutationTuple<TData, TVariables>,
): [
  (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>,
  MutationResult<TData>,
  () => void,
] {
  const [mutation, result] = tuple
  const [stored, setStored] = useState<
    | {
        data: typeof result.data
        error: typeof result.error
      }
    | undefined
  >(undefined)

  useEffect(() => {
    setStored({
      data: result.data,
      error: result.error,
    })
  }, [result.data, result.error])

  const reset = useCallback(() => {
    setStored(undefined)
  }, [])

  const resetResult = useMemo(
    () => ({
      ...result,
      data: stored?.data,
      error: stored?.error,
    }),
    [result, stored?.data, stored?.error],
  )

  return [mutation, resetResult, reset]
}
