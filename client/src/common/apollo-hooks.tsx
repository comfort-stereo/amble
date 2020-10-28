import {
  FetchResult,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationResult,
  TypedDocumentNode,
  useMutation as useMutationBase,
} from "@apollo/client"
import { useCallback, useEffect, useMemo, useState } from "react"

type WrappedMutationTuple<TData, TVariables> = [
  (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>,
  MutationResult<TData> & {
    clear: () => void
  },
]

export function useMutation<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables>,
): WrappedMutationTuple<TData, TVariables> {
  const [mutation, result] = useMutationBase(document, {
    errorPolicy: "all",
    ...options,
  })
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

  const clear = useCallback(() => {
    setStored(undefined)
  }, [])

  const extendedResult = useMemo(
    () => ({
      ...result,
      data: stored?.data,
      error: stored?.error,
      clear,
    }),
    [clear, result, stored?.data, stored?.error],
  )

  return [mutation, extendedResult]
}
