import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AnyphotoEditor from '../components/playground/anyphotoEditor'
import AnyphotoResult from '../components/playground/anyphotoResult'
import { type GenerateParams, generatePhoto } from '../api/generate'
function Playground() {
  const [isGenerate, setIsGenerate] = useState(false)
  const [generatedPhotoUrl, setGeneratedPhotoUrl] = useState('')
  const generate = async (params: GenerateParams) => {
    setIsGenerate(true)
    const res = await generatePhoto(params)
    setGeneratedPhotoUrl(res.data.url)
  }
  return (
    <React.Fragment>
      <AppAppBar />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AnyphotoEditor generate={generate} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnyphotoResult generatedPhotoUrl={generatedPhotoUrl} isGenerate={isGenerate} />
          </Grid>
        </Grid>
      </Box>
      <AppFooter />
    </React.Fragment>
  )
}

export default Playground
