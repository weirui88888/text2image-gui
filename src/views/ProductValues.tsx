import React from 'react'
import { type Theme, useTheme } from '@mui/material/styles'
import { type SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '../components/Typography'

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5
}

function ProductValues() {
  const theme = useTheme()
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        overflow: 'hidden',
        bgcolor: 'secondary.main',
        transition: theme.transitions.create('background-color')
      }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5} sx={{ color: 'secondary.contrastText' }}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '55px', height: '55px' }}
                  fill="none"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"
                  ></path>
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 8h4l-4 8h4"
                  ></path>
                </svg>
              </SvgIcon>

              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                zero configuration
              </Typography>
              <Typography variant="h5">
                Without any configuration, you can easily and quickly generate personalized style photos, get started
                easily, and realize your creativity and inspiration quickly.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '55px', height: '55px' }}
                  fill="none"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14 9-.25.375M10 9a5 5 0 1 0 0 6l.334-.5M10 9l4 6a5 5 0 1 0 0-6"
                  ></path>
                </svg>
              </SvgIcon>

              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                high freedom
              </Typography>
              <Typography variant="h5">
                Being eclectic, you can completely follow your own ideas and achieve a more free creative style. Use
                your imagination and creativity, what you see is what you get.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '55px', height: '55px' }}
                  fill="none"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9H8m8 0h-2M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12Zm12 1h-4v3c0 .667.4 2 2 2s2-1.333 2-2v-3Z"
                  ></path>
                </svg>
              </SvgIcon>

              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                easy to use
              </Typography>
              <Typography variant="h5">
                There are some great themes built in, so even if you&apos;re not a developer, you can implement your
                creations in no time. More often than not, I encourage you to explore in depth
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProductValues
