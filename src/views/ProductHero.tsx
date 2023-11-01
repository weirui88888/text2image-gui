import React from 'react'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '../components/Button'
import Typography from '../components/Typography'
import ProductHeroLayout from './ProductHeroLayout'
import { Link as RouterLink } from 'react-router-dom'
import { useApp } from '../store/app'

// const backgroundImage = 'https://anyphoto.newarray.vip/pexels-markus-spiske-1921326.jpg'
const backgroundImage = 'https://anyphoto.newarray.vip/pexels-krishna-lair-1165005.jpg'

export default function ProductHero() {
  const { state } = useApp()
  const theme = useTheme()
  const { isLoggedIn, isFetchingAuth } = state
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center'
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h1" marked="center">
        Photo by any inspiration
      </Typography>
      <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: { sx: 4, sm: 6 } }}>
        You can generate any photo that satisfies you anywhere.
      </Typography>
      <Button
        color="button"
        variant="contained"
        size="large"
        component={RouterLink}
        to={isLoggedIn ? 'playground' : '/login-in'}
        sx={{ minWidth: 200, '&.Mui-disabled': { background: theme.palette.button.dark } }}
        disabled={isFetchingAuth}
      >
        {isFetchingAuth ? (
          <CircularProgress size={24} sx={{ color: theme.palette.button.contrastText }} />
        ) : isLoggedIn ? (
          'Go PlayGround'
        ) : (
          'Login In'
        )}
      </Button>
    </ProductHeroLayout>
  )
}
