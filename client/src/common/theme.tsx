import Color from "color"
import Head from "next/head"
import React, { DependencyList, ReactNode, useMemo } from "react"
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native"

type ColorTheme = Readonly<{
  neutral: Color
  neutralForeground: Color
  primary: Color
  primaryForeground: Color
  secondary: Color
  secondaryForeground: Color
  warning: Color
  warningForeground: Color
  danger: Color
  dangerForeground: Color
}>

export type ColorRole = "neutral" | "primary" | "secondary" | "warning" | "danger"
export type ColorThemeName = "dark" | "light"

export class Theme {
  constructor(
    public readonly name: ColorThemeName,
    public readonly isDark: boolean,
    public readonly colors: ColorTheme,
  ) {}

  background = (role: ColorRole) => {
    return this.colors[role]
  }

  foreground = (role: ColorRole) => {
    return this.colors[(role + "Foreground") as keyof ColorTheme]
  }
}

const light = new Theme("light", false, {
  neutral: Color("white"),
  neutralForeground: Color("#212121"),
  primary: Color("#008fd1").lighten(0.05),
  primaryForeground: Color("white"),
  secondary: Color("#00aed1"),
  secondaryForeground: Color("white"),
  warning: Color("#f59342"),
  warningForeground: Color("white"),
  danger: Color("#DD0000"),
  dangerForeground: Color("white"),
})

const dark = new Theme("dark", true, {
  ...light.colors,
  neutral: Color("#212121"),
  neutralForeground: Color("white"),
})

function getTheme(name: ColorThemeName): Theme {
  switch (name) {
    case "dark":
      return dark
    case "light":
      return light
  }
}

type ThemeProviderProps = Readonly<{
  theme: ColorThemeName
  children?: ReactNode
}>

const ThemeContext = React.createContext<Theme>(dark)

const css = `
  * {
    outline: none !important;
  }
`

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={getTheme(theme)}>
      <Head>
        <style>{css}</style>
      </Head>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): Theme {
  return React.useContext(ThemeContext)
}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export function useStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: (theme: Theme) => T | NamedStyles<T>,
  deps: DependencyList,
): T {
  const theme = useTheme()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => StyleSheet.create(factory(theme)), [factory, theme, ...deps])
}
