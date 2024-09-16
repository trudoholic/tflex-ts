import { useState } from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const switchTheme = () => {
    setIsDarkMode(mode => !mode)
  }

  return {
    isDarkMode,
    switchTheme,
  }
}

export default useDarkMode
