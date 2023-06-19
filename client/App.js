import React from 'react';

import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor='blue' />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
