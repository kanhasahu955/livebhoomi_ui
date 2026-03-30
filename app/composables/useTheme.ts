import { theme, themeBranding, themeColors, themeCssVarNames } from '../config/theme.config'

export function useTheme() {
  return {
    theme,
    branding: themeBranding,
    colors: themeColors,
    cssVar: themeCssVarNames,
  }
}
