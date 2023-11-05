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
    primary: '#000000'
  },
  primary: {
    main: '#82b484', // 控制顶部背景颜色和PHOTO BY ANY INSPIRATION的边框颜色,
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#cfe3d0' // 控制2，4，6模块的背景颜色以及设置对应比度字体颜色
  }
}

const darkPalette: PaletteOptions = {
  mode: 'dark',

  primary: {
    main: grey[900]
  },
  secondary: {
    main: grey[600]
  },
  text: {
    primary: '#000000' // 控制底部链接颜色和主文案颜色
  },
  background: {
    default: grey[200]
  }
}

const getThemeByAppThemeMode = (mode: PaletteMode) => {
  const modePalette = mode === 'light' ? lightPalette : darkPalette
  const modeTheme = createTheme({
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
    color: modeTheme.palette.text.primary,
    fontWeight: modeTheme.typography.fontWeightMedium,
    fontFamily: "'Roboto Condensed', sans-serif",
    textTransform: 'uppercase'
  }

  const theme = {
    ...modeTheme,
    palette: {
      ...modeTheme.palette,
      background: {
        ...modeTheme.palette.background,
        placeholder: grey[200]
      }
    },
    typography: {
      ...modeTheme.typography,
      fontHeader,
      h1: {
        ...modeTheme.typography.h1,
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60
      },
      h2: {
        ...modeTheme.typography.h2,
        ...fontHeader,
        fontSize: 48
      },
      h3: {
        ...modeTheme.typography.h3,
        ...fontHeader,
        fontSize: 42
      },
      h4: {
        ...modeTheme.typography.h4,
        ...fontHeader,
        fontSize: 36
      },
      h5: {
        ...modeTheme.typography.h5,
        fontSize: 20,
        fontWeight: modeTheme.typography.fontWeightLight
      },
      h6: {
        ...modeTheme.typography.h6,
        ...fontHeader,
        fontSize: 18
      },
      subtitle1: {
        ...modeTheme.typography.subtitle1,
        fontSize: 18
      },
      body2: {
        ...modeTheme.typography.body1,
        fontSize: 14
      }
    }
  }
  const themeWithPaletteButton = createTheme(theme, {
    palette: {
      button: theme.palette.augmentColor({
        color: {
          main: '#82b484',
          contrastText: '#ffffff'
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
