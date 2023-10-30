import React from 'react'
import { type Theme } from '@mui/material/styles'
import { withStyles, type WithStyles } from '@mui/styles'
import MuiTypography, { type TypographyProps } from '@mui/material/Typography'
import Box from '@mui/material/Box'

const markStyleMapping: Record<string, Record<string, string>> = {
  center: {
    h1: '',
    h2: 'markedH2Center',
    h3: 'markedH3Center',
    h4: 'markedH4Center',
    h5: 'markedH5Center',
    h6: ''
  },
  left: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: 'markedH6Left'
  },
  none: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: ''
  }
}

const styles = (theme: Theme) => ({
  [markStyleMapping.center.h2]: {
    // NOTE 这个的意思就是将这些key和value注入这个组件中，其中的子元素设置了对应的key，也就是classname就会被设置value的样式
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`
  },
  [markStyleMapping.center.h3]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`
  },
  [markStyleMapping.center.h4]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`
  },
  [markStyleMapping.center.h5]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`
  },
  [markStyleMapping.left.h6]: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5)
  }
})

interface ExtraTypographyProps {
  marked?: 'center' | 'left' | 'none'
  suffixColor?: string
}

const variantMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h3'
}

function Typography<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> & WithStyles<typeof styles> & ExtraTypographyProps
) {
  const { children, variant, classes, suffixBgColor, marked = 'none', ...other } = props
  let markedClassName = ''
  if (variant && variant in markStyleMapping[marked]) {
    markedClassName = classes[markStyleMapping[marked][variant]]
  }

  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {markedClassName ? <Box component="span" className={markedClassName} sx={{ bgcolor: suffixBgColor }} /> : null}
    </MuiTypography>
  )
}

export default withStyles(styles)(Typography)
