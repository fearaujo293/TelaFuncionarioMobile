import React from 'react';
import VeterinarianTabNavigator from './VeterinarianTabNavigator';
import { VeterinarianProvider } from '../context/VeterinarianContext';

const VeterinarianMainApp = () => {
  return (
    <VeterinarianProvider>
      <VeterinarianTabNavigator />
    </VeterinarianProvider>
  );
};

export default VeterinarianMainApp;