export const isSafeHttpUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

export const isSafeImageSource = (value: string): boolean => {
  if (!value) return true;
  if (value.startsWith('/')) return true;
  return isSafeHttpUrl(value);
};

export const isSafeEventLink = (value: string): boolean => {
  if (!value || value === '#') return true;
  return isSafeHttpUrl(value);
};

export const normalizeSafeEventUrl = (value: string): string | null => {
  if (!value || value === '#') return '#';
  return isSafeHttpUrl(value) ? value : null;
};
