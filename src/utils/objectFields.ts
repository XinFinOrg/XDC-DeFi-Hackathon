//returns FALSE if any of the obj[key] is falsy value
//otherwise TRUE
export function anyUndefinedKey<T extends object>(obj: T) {
  for (const key of Object.keys(obj)) {
    if (obj[key as keyof T] === undefined) return true;
  }

  return false;
}
