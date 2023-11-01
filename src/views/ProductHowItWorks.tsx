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

// const number = {
//   fontSize: 24,
//   fontFamily: 'default',
//   color: 'inherit',
//   fontWeight: 'medium'
// }

// const image = {
//   height: 55,
//   my: 4
// }

function ProductHowItWorks() {
  const theme = useTheme()
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        bgcolor: 'secondary.main',
        overflow: 'hidden',
        transition: theme.transitions.create('background-color')
      }}
    >
      <Container
        maxWidth="xl"
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
        <Typography
          variant="h4"
          marked="center"
          component="h2"
          suffixBgColor={theme.palette.secondary.contrastText}
          sx={{ mb: 10, color: 'secondary.contrastText' }}
        >
          the way to use it
        </Typography>
        <div>
          <Grid container spacing={5} sx={{ color: 'secondary.contrastText' }}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                {/* <Box sx={number}>1.NPM</Box> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '80px', height: '80px' }}
                  fill="none"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1 8h22v7H11v2H7.5v-2H1V8ZM7.5 8v7M13.5 8v7"
                  ></path>
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    d="M18 11v4M5 11v4M11 11v1M20.5 11v4"
                  ></path>
                </svg>
                {/* <Box component="img" src="/productHowItWorks1.svg" alt="suitcase" sx={image} /> */}
                <Typography variant="h5">
                  Globally installed executable scripts are highly playable and provide maximum customization and
                  flexibility. You can execute the script directly in the command line and control the style and style
                  of the generated images by adjusting the script parameters. This method is suitable for users with
                  certain technical background and programming knowledge, who can customize and expand according to
                  their own needs.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                {/* <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '80px', height: '80px' }}
                >
                  <path
                    strokeLinecap="round"
                    d="M475.249778 690.176h-48.355556l-19.228444-49.948444h-87.836445l-18.204444 49.948444h-47.104l85.674667-219.818667H386.844444zM393.443556 603.022222l-30.264889-81.578666L333.482667 603.022222zM498.801778 690.176V470.357333h71.224889a252.814222 252.814222 0 0 1 52.792889 3.299556 57.685333 57.685333 0 0 1 31.630222 21.504 68.266667 68.266667 0 0 1 12.743111 42.780444 69.973333 69.973333 0 0 1-7.395556 34.133334 59.392 59.392 0 0 1-18.659555 21.731555 63.943111 63.943111 0 0 1-22.755556 10.467556 259.640889 259.640889 0 0 1-45.511111 3.072h-29.696v82.944z m44.373333-182.044444v62.350222h24.234667a116.394667 116.394667 0 0 0 35.157333-3.413334 29.354667 29.354667 0 0 0 13.880889-10.808888 29.809778 29.809778 0 0 0 5.006222-17.066667A28.330667 28.330667 0 0 0 614.4 518.826667a30.378667 30.378667 0 0 0-17.863111-9.784889 210.375111 210.375111 0 0 0-31.971556-1.479111zM702.350222 690.176V470.357333h44.373334v219.818667z"
                    fill={theme.palette.secondary.contrastText}
                  ></path>
                  <path
                    strokeLinecap="round"
                    d="M761.173333 832.853333H525.880889v-52.337777H761.173333c67.697778 0 121.628444-29.696 152.007111-83.740445a205.368889 205.368889 0 0 0-3.868444-199.793778c-36.408889-59.847111-102.4-91.022222-186.254222-88.405333l-26.965334 1.024v-27.192889c0-56.888889-19.000889-104.334222-54.727111-136.533333a181.248 181.248 0 0 0-122.311111-44.487111c-88.405333 0-187.278222 56.888889-187.278222 181.248V409.6l-27.534222-1.479111c-85.219556-4.323556-152.348444 25.941333-189.44 85.333333a198.428444 198.428444 0 0 0-4.664889 196.608c32.199111 58.140444 91.022222 90.112 166.115555 90.112h95.004445v52.337778h-95.004445c-93.411556 0-170.666667-42.666667-211.854222-116.963556a251.676444 251.676444 0 0 1 6.030222-250.311111c43.576889-69.745778 117.532444-108.316444 210.261334-110.250666 12.856889-135.168 128.113778-206.165333 238.364444-206.165334a233.472 233.472 0 0 1 157.468445 58.026667 222.549333 222.549333 0 0 1 70.769777 149.390222c91.022222 3.527111 164.067556 43.349333 206.734223 113.777778a255.544889 255.544889 0 0 1 4.778666 252.586667c-39.480889 69.973333-111.502222 110.250667-197.632 110.250666z"
                    fill={theme.palette.secondary.contrastText}
                  ></path>
                  <path
                    strokeLinecap="round"
                    d="M486.058667 806.912l91.022222 68.266667v-136.533334l-91.022222 68.266667z"
                    fill={theme.palette.secondary.contrastText}
                  ></path>
                </svg> */}
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '80px', height: '80px' }}
                >
                  <path
                    strokeLinecap="round"
                    d="M192 469.333333H106.666667v-85.333333H42.666667v256h64v-106.666667h85.333333v106.666667h64V384H192v85.333333z m106.666667-21.333333h64v192h64v-192h64v-64h-192v64z m234.666666 0h64v192h64v-192h64v-64h-192v64z m384-64h-149.333333v256h64v-85.333333h85.333333c36.266667 0 64-27.733333 64-64v-42.666667c0-36.266667-27.733333-64-64-64z m0 106.666667h-85.333333v-42.666667h85.333333v42.666667z"
                    fill={theme.palette.secondary.contrastText}
                  ></path>
                </svg>
                {/* <Box component="img" src="/productHowItWorks2.svg" alt="graph" sx={image} /> */}
                <Typography variant="h5">
                  Through API calls, you can encapsulate the image generation process as a service that can be used by
                  other applications and developers. This allows the process of generating images to be automated
                  programmatically and integrated with other systems. Using API calls enables fast and flexible image
                  generation and is suitable for users who need to integrate image generation functionality into their
                  applications.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                {/* <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '80px', height: '80px' }}
                >
                  <path
                    d="M698.026667 597.333333c3.413333-28.16 5.973333-56.32 5.973333-85.333333 0-29.013333-2.56-57.173333-5.973333-85.333333h144.213333c6.826667 27.306667 11.093333 55.893333 11.093333 85.333333s-4.266667 58.026667-11.093333 85.333333m-219.733333 237.226667c25.6-47.36 45.226667-98.56 58.88-151.893333h125.866666a342.613333 342.613333 0 0 1-184.746666 151.893333M611.84 597.333333H412.16c-4.266667-28.16-6.826667-56.32-6.826667-85.333333 0-29.013333 2.56-57.6 6.826667-85.333333h199.68c3.84 27.733333 6.826667 56.32 6.826667 85.333333 0 29.013333-2.986667 57.173333-6.826667 85.333333M512 851.626667c-35.413333-51.2-64-107.946667-81.493333-168.96h162.986666c-17.493333 61.013333-46.08 117.76-81.493333 168.96M341.333333 341.333333H216.746667A338.048 338.048 0 0 1 401.066667 189.44C375.466667 236.8 356.266667 288 341.333333 341.333333m-124.586666 341.333334H341.333333c14.933333 53.333333 34.133333 104.533333 59.733334 151.893333A341.674667 341.674667 0 0 1 216.746667 682.666667m-34.986667-85.333334C174.933333 570.026667 170.666667 541.44 170.666667 512s4.266667-58.026667 11.093333-85.333333h144.213333c-3.413333 28.16-5.973333 56.32-5.973333 85.333333 0 29.013333 2.56 57.173333 5.973333 85.333333M512 171.946667c35.413333 51.2 64 108.373333 81.493333 169.386666h-162.986666c17.493333-61.013333 46.08-118.186667 81.493333-169.386666M807.253333 341.333333h-125.866666a667.733333 667.733333 0 0 0-58.88-151.893333c78.506667 26.88 143.786667 81.066667 184.746666 151.893333M512 85.333333C276.053333 85.333333 85.333333 277.333333 85.333333 512c0 235.52 191.146667 426.666667 426.666667 426.666667s426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z"
                    fill={theme.palette.secondary.contrastText}
                  ></path>
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '80px', height: '80px' }}
                  fill="none"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 21h15M21 21h1"
                  ></path>
                  <path
                    stroke={theme.palette.secondary.contrastText}
                    strokeWidth="1"
                    d="M2 16.4V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6Z"
                  ></path>
                </svg>
                {/* <Box component="img" src="/productHowItWorks3.svg" alt="clock" sx={image} /> */}
                <Typography variant="h5" align="center">
                  {'New offers every week. New experiences, new surprises. '}
                  {'Your Sundays will no longer be alike.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button color="button" size="large" variant="contained" component={RouterLink} to="/sign-up" sx={{ mt: 8 }}>
          Get started
        </Button>
      </Container>
    </Box>
  )
}

export default ProductHowItWorks
