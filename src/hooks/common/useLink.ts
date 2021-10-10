const useLink = (): {
  openLink: (link: string) => void
} => {
  const openLink = (link: string): void => {
    window.open(link, '_blank')
  }

  return {
    openLink,
  }
}

export default useLink
