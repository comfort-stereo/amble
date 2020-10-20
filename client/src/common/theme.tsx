import Color from "color"
import Head from "next/head"
import React, { ReactNode, useMemo } from "react"
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native"

const css = `
  * {
    outline: none !important;
  }
`

type ColorTheme = Readonly<{
  surface: string
  surfaceContent: string
  primary: string
  primaryContent: string
  secondary: string
  secondaryContent: string
}>

export type ColorRole = "surface" | "primary" | "secondary"
export type ColorRoleVariant = "normal" | "muted" | "content"
export type ColorThemeName = "dark" | "light"

type FontThemeStyleProperty =
  | "fontFamily"
  | "fontSize"
  | "fontStyle"
  | "fontWeight"
  | "letterSpacing"
  | "lineHeight"

export class Theme {
  constructor(
    public readonly name: ColorThemeName,
    public readonly isDark: boolean,
    public readonly colors: ColorTheme,
  ) {}

  colorFor = (role: ColorRole) => {
    return Color(this.colors[role]) as Color
  }

  contentColorFor = (role: ColorRole) => {
    return Color(this.colors[(role + "Content") as keyof ColorTheme]) as Color
  }
}

const light = new Theme("light", false, {
  surface: "white",
  surfaceContent: "#212121",
  primary: Color("#F33A5A").darken(0.15).hex(),
  primaryContent: "white",
  secondary: Color("#4BD8D9").darken(0.4).hex(),
  secondaryContent: "white",
})

const dark = new Theme("dark", true, {
  ...light.colors,
  surface: "#212121",
  surfaceContent: "white",
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
  dependencies: unknown[],
): T {
  const theme = useTheme()
  return useMemo(() => StyleSheet.create(factory(theme)), [theme, ...dependencies])
}
