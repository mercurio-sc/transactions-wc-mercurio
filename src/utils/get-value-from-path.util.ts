export default function <T = string | number, O = Record<string, T>>(
  obj: O,
  path: string
): T | undefined {
  const keys = path.split(".");
  let value: T | O = obj;

  for (const key of keys) {
    if (value && typeof value === "object") {
      value = (value as Record<string, T>)[key] as T | O;
    } else {
      return undefined;
    }
  }

  return value as T | undefined;
}
