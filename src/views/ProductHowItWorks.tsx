import React from 'react'
import { type Theme, useTheme } from '@mui/material/styles'
import { type SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '../components/Button'
import Typography from '../components/Typography'
import { Link as RouterLink } from 'react-router-dom'

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5
}

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'inherit',
  fontWeight: 'medium'
}

const image = {
  height: 55,
  my: 4
}

function ProductHowItWorks() {
  const theme = useTheme()
  return (
    <Box component="section" sx={{ display: 'flex', bgcolor: 'secondary.main', overflow: 'hidden', transition: theme.transitions.create('background-color') }}>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14, color: 'secondary.contrastText' }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5} sx={{ color: 'secondary.contrastText' }}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box component="img" src="/productHowItWorks1.svg" alt="suitcase" sx={image} />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box component="img" src="/productHowItWorks2.svg" alt="graph" sx={image} />
                <Typography variant="h5" align="center">
                  First come, first served. Our offers are in limited quantities, so be quick.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box component="img" src="/productHowItWorks3.svg" alt="clock" sx={image} />
                <Typography variant="h5" align="center">
                  {'New offers every week. New experiences, new surprises. '}
                  {'Your Sundays will no longer be alike.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button color="button" size="large" variant="contained" component={RouterLink} to="/sign-up/" sx={{ mt: 8 }}>
          Get started
        </Button>
      </Container>
    </Box>
  )
}

export default ProductHowItWorks
