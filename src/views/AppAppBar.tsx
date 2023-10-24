import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import AppBar from '../components/AppBar'
import Toolbar from '../components/Toolbar'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { useApp } from '../store/app'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3
}

function AppAppBar() {
  const { t } = useTranslation()
  // const { state } = useApp()
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link variant="h6" underline="hover" color="inherit" component={RouterLink} to="/" sx={{ fontSize: 24 }}>
            {'anyphoto'}
          </Link>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {/* {state.isLoggedIn ? '已登录' : '未登录'} */}
            <Link color="inherit" variant="h6" underline="none" component={RouterLink} to="/login-in/" sx={rightLink}>
              {t('login-in')}
            </Link>
            <Link
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {t('sign-up')}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default AppAppBar
