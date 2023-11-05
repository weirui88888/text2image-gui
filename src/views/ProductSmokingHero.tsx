import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '../components/Typography'

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'secondary.contrastText',
        my: 9
      }}
    >
      <Button
        sx={{
          border: '4px solid',
          borderColor: 'secondary.contrastText',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5
        }}
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }} color="secondary.contrastText">
        We are here to help. Get in touch!
      </Typography>
      <Box component="img" src="/producBuoy.svg" alt="buoy" sx={{ width: 60 }} />
    </Container>
  )
}

export default ProductSmokingHero
