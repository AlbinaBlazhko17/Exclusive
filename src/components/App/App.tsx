import { Route, Routes } from 'react-router-dom';
import routesConfig from '../../routes/routesConfig';

import 'swiper/css';
import './App.css'

function App() {
  return (
   <>
    <Routes>
        {
          routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))
        }
    </Routes>
   </>
  )
}

export default App
