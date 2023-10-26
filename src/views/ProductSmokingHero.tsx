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
        my: 9
      }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5
        }}
      >
        <Typography variant="h4" component="span" sx={{ color: 'common.black' }}>
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }} color="common.black">
        We are here to help. Get in touch!
      </Typography>
      <Box component="img" src="/producBuoy.svg" alt="buoy" sx={{ width: 60 }} />
    </Container>
  )
}

export default ProductSmokingHero
