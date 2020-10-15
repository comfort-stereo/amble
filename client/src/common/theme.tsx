import React, { ReactNode } from "react"

const colors = {
  neutral: {
    dark: {
      "neutral-100": "#FFFFFF",
      "neutral-200": "#DFDFDF",
      "neutral-300": "#BFBFBF",
      "neutral-400": "#9F9F9F",
      "neutral-500": "#7F7F7F",
      "neutral-600": "#5F5F5F",
      "neutral-700": "#3F3F3F",
      "neutral-800": "#1F1F1F",
      "neutral-900": "#000000",
    },
    light: {
      "neutral-100": "#000000",
      "neutral-200": "#1F1F1F",
      "neutral-300": "#3F3F3F",
      "neutral-400": "#5F5F5F",
      "neutral-500": "#7F7F7F",
      "neutral-600": "#9F9F9F",
      "neutral-700": "#BFBFBF",
      "neutral-800": "#DFDFDF",
      "neutral-900": "#FFFFFF",
    },
  },
  contextual: {
    "primary-100": "#FEF3CC",
    "primary-200": "#FDE39B",
    "primary-300": "#FACE68",
    "primary-400": "#F6B842",
    "primary-500": "#F09707",
    "primary-600": "#CE7905",
    "primary-700": "#AC5E03",
    "primary-800": "#8B4602",
    "primary-900": "#733501",
    "primary-transparent-100": "rgba(240, 151, 7, 0.08)",
    "primary-transparent-200": "rgba(240, 151, 7, 0.16)",
    "primary-transparent-300": "rgba(240, 151, 7, 0.24)",
    "primary-transparent-400": "rgba(240, 151, 7, 0.32)",
    "primary-transparent-500": "rgba(240, 151, 7, 0.4)",
    "primary-transparent-600": "rgba(240, 151, 7, 0.48)",
    "success-100": "#ECFEE6",
    "success-200": "#D5FDCD",
    "success-300": "#B8F9B2",
    "success-400": "#9DF49E",
    "success-500": "#7DED88",
    "success-600": "#5BCB70",
    "success-700": "#3EAA5D",
    "success-800": "#27894C",
    "success-900": "#187141",
    "success-transparent-100": "rgba(125, 237, 136, 0.08)",
    "success-transparent-200": "rgba(125, 237, 136, 0.16)",
    "success-transparent-300": "rgba(125, 237, 136, 0.24)",
    "success-transparent-400": "rgba(125, 237, 136, 0.32)",
    "success-transparent-500": "rgba(125, 237, 136, 0.4)",
    "success-transparent-600": "rgba(125, 237, 136, 0.48)",
    "info-100": "#CCF0FE",
    "info-200": "#99DDFE",
    "info-300": "#66C4FE",
    "info-400": "#40ABFD",
    "info-500": "#0283FC",
    "info-600": "#0165D8",
    "info-700": "#014BB5",
    "info-800": "#003592",
    "info-900": "#002578",
    "info-transparent-100": "rgba(2, 131, 252, 0.08)",
    "info-transparent-200": "rgba(2, 131, 252, 0.16)",
    "info-transparent-300": "rgba(2, 131, 252, 0.24)",
    "info-transparent-400": "rgba(2, 131, 252, 0.32)",
    "info-transparent-500": "rgba(2, 131, 252, 0.4)",
    "info-transparent-600": "rgba(2, 131, 252, 0.48)",
    "warning-100": "#FEF7D3",
    "warning-200": "#FEEEA7",
    "warning-300": "#FDE27B",
    "warning-400": "#FBD55A",
    "warning-500": "#F9C125",
    "warning-600": "#D69F1B",
    "warning-700": "#B38012",
    "warning-800": "#90620B",
    "warning-900": "#774D07",
    "warning-transparent-100": "rgba(249, 193, 37, 0.08)",
    "warning-transparent-200": "rgba(249, 193, 37, 0.16)",
    "warning-transparent-300": "rgba(249, 193, 37, 0.24)",
    "warning-transparent-400": "rgba(249, 193, 37, 0.32)",
    "warning-transparent-500": "rgba(249, 193, 37, 0.4)",
    "warning-transparent-600": "rgba(249, 193, 37, 0.48)",
    "danger-100": "#FFE9DC",
    "danger-200": "#FFCDB9",
    "danger-300": "#FFAB96",
    "danger-400": "#FF8C7C",
    "danger-500": "#FF5751",
    "danger-600": "#DB3B43",
    "danger-700": "#B7283C",
    "danger-800": "#931934",
    "danger-900": "#7A0F30",
    "danger-transparent-100": "rgba(255, 87, 81, 0.08)",
    "danger-transparent-200": "rgba(255, 87, 81, 0.16)",
    "danger-transparent-300": "rgba(255, 87, 81, 0.24)",
    "danger-transparent-400": "rgba(255, 87, 81, 0.32)",
    "danger-transparent-500": "rgba(255, 87, 81, 0.4)",
    "danger-transparent-600": "rgba(255, 87, 81, 0.48)",
  },
}

export const darkColors = {
  ...colors.neutral.dark,
  ...colors.contextual,
}
export const lightColors = {
  ...colors.neutral.light,
  ...colors.contextual,
}

export type ColorSheet = typeof darkColors
export type ColorName = keyof ColorSheet

export type ThemeName = "dark" | "light"

export class Theme {
  constructor(private colors: ColorSheet) {}

  color(name: ColorName): string {
    return this.colors[name]
  }
}

const dark = new Theme(darkColors)
const light = new Theme(lightColors)

function getTheme(name: ThemeName): Theme {
  switch (name) {
    case "dark":
      return dark
    case "light":
      return light
  }
}

type ThemeProviderProps = Readonly<{
  theme: ThemeName
  children?: ReactNode
}>

const ThemeContext = React.createContext<Theme>(dark)

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={getTheme(theme)}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  return React.useContext(ThemeContext)
}
