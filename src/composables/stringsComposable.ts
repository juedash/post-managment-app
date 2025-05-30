export function useFormatString() {
  const firstLetterUppercase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return {
    firstLetterUppercase,
  }
}
