import { Text, Grid, Link, useToasts } from '@geist-ui/core'
import { useLongPress } from 'use-long-press'

const PageFooter = () => {
  const { setToast } = useToasts({
    placement: 'topRight'
  })
  const bind = useLongPress(() => {
    setToast({
      delay: 5000,
      text: (
        <div style={{}}>
          <Text p my={0} font={0.75} style={{ wordBreak: 'break-all' }}>
            提交记录:{process.env.REACT_APP_WEBSITE_LATEST_COMMIT_ID}
          </Text>
          <Text p my={0} font={0.75} style={{ wordBreak: 'break-all' }}>
            提交信息:{process.env.REACT_APP_WEBSITE_LATEST_COMMIT_MESSAGE}
          </Text>
        </div>
      )
    })
  })
  return (
    <Grid.Container style={{ height: '64px', paddingBottom: '8px',marginTop:'24px'}}>
      <Grid xs={24}>
        <Text my={0} b style={{ textAlign: 'center', textTransform: 'uppercase' }} width="100%" font={1.1}>
          Version 1.0.0
        </Text>
      </Grid>
      <Grid xs={24} style={{ padding: 0, position: 'relative' }}>
        <Text my={0} style={{ textAlign: 'center' }} width="100%" font={0.8}>
          Page Made By{' '}
          <Link placeholder="geist" href="https://geist-ui.dev/en-us" color>
            Geist
          </Link>
        </Text>
        <div style={{ width: '32px', height: '32px', position: 'absolute', right: 0, bottom: 0 }} {...bind()}></div>
      </Grid>
    </Grid.Container>
  )
}

export default PageFooter
