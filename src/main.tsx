import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Enter from './pages/Enter'
import Home from './pages/Home'
import Express from './pages/Express'
import Taxi from './pages/Taxi'
import Quick from './pages/Quick'
import Bullet from './pages/Bullet'
import MapSummary from './pages/MapSummary'
import Settings from './pages/Settings'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)

export default createBrowserRouter([
  { path: '/enter', element: <Enter /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'express', element: <Express /> },
      { path: 'taxi', element: <Taxi /> },
      { path: 'quick', element: <Quick /> },
      { path: 'bullet', element: <Bullet /> },
      { path: 'map-summary', element: <MapSummary /> },
      { path: 'settings', element: <Settings /> }
    ]
  }
])

