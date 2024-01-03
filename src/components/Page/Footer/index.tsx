import { Text, Grid, Link, useToasts } from '@geist-ui/core'
import { useLongPress } from 'use-long-press'

const PageFooter = () => {
  const { setToast } = useToasts({
    placement: 'topRight',
    width: 'fit-content'
  })
  const bind = useLongPress(() => {
    setToast({
      delay: 5000,
      text: (
        <div>
          <p>提交记录:{process.env.REACT_APP_WEBSITE_LATEST_COMMIT_ID}</p>
          <p>提交信息:{process.env.REACT_APP_WEBSITE_LATEST_COMMIT_MESSAGE}</p>
        </div>
      )
    })
  })
  return (
    <Grid.Container justify="center" alignItems="center">
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
        <div style={{ width: '21px', height: '21px', position: 'absolute', right: 0 }} {...bind()}></div>
      </Grid>
    </Grid.Container>
  )
}

export default PageFooter
