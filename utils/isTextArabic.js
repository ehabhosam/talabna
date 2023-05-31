export function isTextArabic(_string) {
  return /[\u0600-\u06FF]/.test(_string);
}
