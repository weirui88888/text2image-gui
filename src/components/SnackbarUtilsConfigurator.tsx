// import React from 'react'
import { useSnackbar, type VariantType, type ProviderContext } from 'notistack'

let useSnackbarRef: ProviderContext
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export default {
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant })
  }
}
