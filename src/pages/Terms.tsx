import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Markdown from '../components/Markdown'
import Typography from '../components/Typography'
import AppAppBar from '../views/AppAppBar'
import AppFooter from '../views/AppFooter'

function Terms() {
  const [markdown, setMarkdown] = useState('')

  // https://github.com/webpack/webpack/issues/6680
  useEffect(() => {
    import('../views/terms.md')
      .then(async content => await fetch(content.default))
      .then(async response => await response.text())
      .then(responseText => {
        setMarkdown(responseText)
      })
  })

  if (!markdown) {
    return <div />
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{markdown}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  )
}

export default Terms
