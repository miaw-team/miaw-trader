export const ifElse = <T>({
  isTrue,
  ifValue,
  elseValue,
}: {
  isTrue?: boolean | string | number
  ifValue: T
  elseValue: T
}): T => {
  if (isTrue) {
    return ifValue
  }
  return elseValue
}
