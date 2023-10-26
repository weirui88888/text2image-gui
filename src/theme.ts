import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

import { type PaletteMode, type SimplePaletteColorOptions, type PaletteOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    button: SimplePaletteColorOptions
  }

  interface PaletteOptions {
    button?: SimplePaletteColorOptions
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    button: true
  }
}

// enum themeModes {
//   'light' = 'light',
//   'dark' = 'dark'
// }

// enum themeLightColors {
//   '#FDE5E5' = '#FDE5E5',
//   '#F0F6F6' = '#F0F6F6',
//   '#EFF4E6' = '#EFF4E6',
//   '#FDF8E2' = '#FDF8E2'
// }

// enum themeDarkColors {
//   '#4C4D4F' = '#4C4D4F'
// }

const lightPalette: PaletteOptions = {
  mode: 'light',
  text: {
    primary: '#78909c' // TODO:3.选择字体
  },
  primary: {
    main: '#4c4d4f' // TODO:1.先挑主色调
  },
  secondary: {
    main: '#eaebed' // TODO:2.再挑对应次色调
  }
}

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    light: '#69696a',
    main: '#28282a',
    dark: '#1e1e1f'
  },
  secondary: {
    light: '#fff5f8',
    main: '#ff0',
    dark: '#e62958'
  }
}

const getThemeByAppThemeMode = (mode: PaletteMode) => {
  const modePalette = mode === 'light' ? lightPalette : darkPalette
  const rawTheme = createTheme({
    palette: modePalette,
    typography: {
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700 // Roboto Condensed
    }
  })

  const fontHeader: Record<string, any> = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: "'Roboto Condensed', sans-serif",
    textTransform: 'uppercase'
  }

  const theme = {
    ...rawTheme,
    palette: {
      ...rawTheme.palette,
      background: {
        ...rawTheme.palette.background,
        default: rawTheme.palette.common.white,
        placeholder: grey[200]
      }
    },
    typography: {
      ...rawTheme.typography,
      fontHeader,
      h1: {
        ...rawTheme.typography.h1,
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60
      },
      h2: {
        ...rawTheme.typography.h2,
        ...fontHeader,
        fontSize: 48
      },
      h3: {
        ...rawTheme.typography.h3,
        ...fontHeader,
        fontSize: 42
      },
      h4: {
        ...rawTheme.typography.h4,
        ...fontHeader,
        fontSize: 36
      },
      h5: {
        ...rawTheme.typography.h5,
        fontSize: 20,
        fontWeight: rawTheme.typography.fontWeightLight
      },
      h6: {
        ...rawTheme.typography.h6,
        ...fontHeader,
        fontSize: 18
      },
      subtitle1: {
        ...rawTheme.typography.subtitle1,
        fontSize: 18
      },
      body2: {
        ...rawTheme.typography.body1,
        fontSize: 14
      }
    }
  }
  const themeWithPaletteButton = createTheme(theme, {
    palette: {
      button: theme.palette.augmentColor({
        color: {
          main: '#e62958' // TODO:4.按钮色调
        },
        name: 'button'
      })
    }
  })
  console.log('themeWithPaletteButton')
  console.log(themeWithPaletteButton)
  console.log('themeWithPaletteButton')
  return themeWithPaletteButton
}

export default getThemeByAppThemeMode
