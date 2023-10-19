import React from 'react'
import ProductCategories from '../views/ProductCategories'
import ProductSmokingHero from '../views/ProductSmokingHero'
import AppFooter from '../views/AppFooter'
import ProductHero from '../views/ProductHero'
import ProductValues from '../views/ProductValues'
import ProductHowItWorks from '../views/ProductHowItWorks'
import ProductCTA from '../views/ProductCTA'
import AppAppBar from '../views/AppAppBar'
import withRoot from '../withRoot'

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(Index)
