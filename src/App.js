import React, { lazy, Suspense } from 'react'
import Footer from './layout/Footer/Footer'
import './styles/App.css'
import { SpinnerCircular } from 'spinners-react'

const ResetCountdownTimers = lazy(() => import('./components/ResetCountdownTimer'))

const App = () => {
  return [
    <h1 className="text-center">Lost Ark EU/NA weekly and daily reset times and countdown</h1>,
    <Suspense fallback={<SpinnerCircular size={'30vh'} color={'grey'} secondaryColor={'transparent'} style={{ margin: 'auto' }} />}>
      <ResetCountdownTimers />
    </Suspense>,
    <Footer />,
  ]
}

export default App
