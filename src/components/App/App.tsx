import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import StepContext from '../StepsProvider/StepsProvider';
import routesConfig from '../../routes/routesConfig';

import 'swiper/css';
import './App.css'

function App() {
  const { currentStep } = useContext(StepContext);

  const dynamicRoutes = routesConfig.map((route, index) => {

    if (route.path === '/cart/form' && currentStep !== 1 || route.path === '/cart/form/confirm' && currentStep !== 2) {
      console.log('Current step'+ currentStep)
      return (
        <Route
          key={index}
          path={route.path}
          element={<Navigate to="/cart" />}
        />
      );
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      );
    }
  });

  return (
   <>
      <Routes>
        {dynamicRoutes}
      </Routes>
   </>
  )
}

export default App
