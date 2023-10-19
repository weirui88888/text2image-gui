import React from 'react'
import clsx from 'clsx'
import { styled, type Theme } from '@mui/material/styles'
import MuiTextField, { type FilledTextFieldProps, type StandardTextFieldProps } from '@mui/material/TextField'
import { selectClasses } from '@mui/material/Select'
import { inputLabelClasses } from '@mui/material/InputLabel'

const inputStyleMappingClasses = {
  small: 'AnyPhotoTextField-inputSizeSmall',
  medium: 'AnyPhotoTextField-inputSizeMedium',
  large: 'AnyPhotoTextField-inputSizeLarge',
  xlarge: 'AnyPhotoTextField-inputSizeXLarge'
}

const classes = {
  root: 'AnyPhotoTextField-root',
  input: 'AnyPhotoTextField-input',
  inputBorder: 'AnyPhotoTextField-inputBorder'
}

// TODO:这里是自定义mui组件样式
const styles = ({ theme }: { theme: Theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  [`& .${classes.input}`]: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.divider
    }
  },
  [`& .${classes.inputBorder}`]: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main
    }
  },
  [`& .${inputStyleMappingClasses.small}`]: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)})`
  },
  [`& .${inputStyleMappingClasses.medium}`]: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)})`
  },
  [`& .${inputStyleMappingClasses.large}`]: {
    fontSize: 18,
    padding: 20,
    width: `calc(100% - ${20 * 2}px)`
  },
  [`& .${inputStyleMappingClasses.xlarge}`]: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`
  },
  [`& .${inputLabelClasses.root}`]: {
    fontSize: 18
  },
  [`& .${selectClasses.select}`]: {
    height: 'auto',
    borderRadius: 0
  },
  [`& .${selectClasses.icon}`]: {
    top: '50%',
    marginTop: -12
  }
})

export interface AnyPhotoTextFieldProps extends Omit<FilledTextFieldProps | StandardTextFieldProps, 'size'> {
  noBorder?: boolean
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}

function TextField(props: AnyPhotoTextFieldProps) {
  const { InputProps = {}, InputLabelProps, noBorder, size = 'medium', SelectProps, ...other } = props

  const { classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {}, ...InputPropsOther } = InputProps

  return (
    <MuiTextField
      InputProps={{
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            inputStyleMappingClasses[size],
            {
              [classes.inputBorder]: !noBorder
            },
            InputPropsClassesInput
          ),
          ...InputPropsClassesOther
        },
        disableUnderline: true,
        ...InputPropsOther
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true
      }}
      SelectProps={SelectProps}
      {...other}
    />
  )
}

export default styled(TextField)(styles)
