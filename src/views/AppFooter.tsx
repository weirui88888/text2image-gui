import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import Typography from '../components/Typography'
import { Link as RouterLink } from 'react-router-dom'

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  )
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark'
  }
}

export default function AppFooter() {
  const theme = useTheme()
  return (
    <Typography component="footer" sx={{ display: 'flex', bgcolor: 'secondary.main', color: 'secondary.contrastText', transition: theme.transitions.create('background-color') }}>
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid container direction="column" justifyContent="flex-end" spacing={2} sx={{ height: 120 }}>
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img src="/appFooterFacebook.png" alt="Facebook" />
                </Box>
                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                  <img src="/appFooterTwitter.png" alt="Twitter" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom color="inherit">
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/terms/" color="inherit" >
                  Terms
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/privacy/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik" color="inherit">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon" color="inherit">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}
