import React from 'react'
import { type Theme, useTheme } from '@mui/material/styles'
import { type SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
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
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.main', transition: theme.transitions.create('background-color') }}>
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
              <Box component="img" src="/productValues1.svg" alt="suitcase" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                The best luxury hotels
              </Typography>
              <Typography variant="h5">
                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}
                {', go for a mini-vacation just a few subway stops away from your home.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/productValues2.svg" alt="graph" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                New experiences
              </Typography>
              <Typography variant="h5">
                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}
                {'your Sundays will not be alike.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/productValues3.svg" alt="clock" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }} color="inherit">
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially negotiated rates '}
                {'that you will not find anywhere else.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProductValues
