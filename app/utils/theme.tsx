import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import { CssBaseline, PaletteMode, Theme, useMediaQuery } from '@mui/material'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    // common palette values
    primary: {
      main: '#6cddaa',
    },
    secondary: {
      main: '#435a6f',
    },
    ...(mode === ColorMode.LIGHT
      ? {
          // palette values for light mode
          text: {
            primary: '#000',
            secondary: '#fff',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#6cddaa',
          },
          secondary: {
            main: '#fdeecc',
          },
          text: {
            primary: '#fff',
            secondary: '#000',
          },
        }),
  },
})

const lightTheme = createTheme(getDesignTokens(ColorMode.LIGHT))

const ThemeContext = React.createContext<{
  toggleColorMode: () => void
  mode: ColorMode
  theme: Theme
}>({
  toggleColorMode: () => {},
  mode: ColorMode.LIGHT,
  theme: lightTheme,
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ColorMode>(ColorMode.LIGHT)
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT))
      },
      mode,
      theme,
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <EmotionThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { useTheme, ThemeProvider, getDesignTokens, ColorMode, lightTheme }
