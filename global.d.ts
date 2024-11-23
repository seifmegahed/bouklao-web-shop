/**
 * GO-like return type to ensure proper error handling
 *
 * This type ensures the the return is either the generic value or the error message.
 *
 * Acts as an XOR gate (Either Or) (Never Neither) (Never Both)
 *
 * This forces the caller to handle the error case.
 *
 * @example
 * ```tsx
 * const [value, error] = await getUserByIdAction(id);
 * if (error !== null) return <p>Error: {error}</p>;
 * return <p>User: {value.name}</p>;
 * ```
 *
 * @param T The generic type to return
 * @returns A tuple of the generic type and a null or a null and a string error message
 */
type ReturnTuple<T> = readonly [T, null] | readonly [null, string];

declare global {
  type ReturnTuple = ReturnTuple;
}
