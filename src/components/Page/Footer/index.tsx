import React from 'react'
import { Text, Grid, Link } from '@geist-ui/core'

const PageFooter = () => {
  return (
    <Grid.Container justify="center" alignItems="center">
      <Grid xs={24}>
        <Text my={0} b style={{ textAlign: 'center', textTransform: 'uppercase' }} width="100%" font={1.1}>
          Version 1.0.0
        </Text>
      </Grid>
      <Grid xs={24} style={{ padding: 0 }}>
        <Text my={0} style={{ textAlign: 'center' }} width="100%" font={0.8}>
          Page Made By{' '}
          <Link placeholder="geist" href="https://geist-ui.dev/en-us" color>
            Geist
          </Link>
        </Text>
      </Grid>
    </Grid.Container>
  )
}

export default PageFooter
