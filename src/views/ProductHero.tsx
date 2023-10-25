import React from 'react'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '../components/Button'
import Typography from '../components/Typography'
import ProductHeroLayout from './ProductHeroLayout'
import { Link as RouterLink } from 'react-router-dom'
import { useApp } from '../store/app'

const backgroundImage = 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80'

export default function ProductHero() {
  const { state } = useApp()
  const theme = useTheme()
  const { isLoggedIn, isFetchingAuth } = state
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
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
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink}
        to={isLoggedIn ? 'playground' : '/login-in/'}
        sx={{ minWidth: 200, '&.Mui-disabled': { background: theme.palette.secondary.dark } }}
        disabled={isFetchingAuth}
      >
        {isFetchingAuth ? (
          <CircularProgress color="secondary" size={24} sx={{ color: '#ffffff' }} />
        ) : isLoggedIn ? (
          'Go PlayGround'
        ) : (
          'Login In'
        )}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  )
}
