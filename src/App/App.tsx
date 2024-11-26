import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import ProtectedRoute from '@components/ProtectedRoute';
import ScrollToTop from '@components/ScrollToTop';
import { FavoriteRecipesProvider } from '@context/FavoriteRecipesContext';
import { ThemeProvider } from '@context/ThemeContext';
import { AuthProvider } from '@context/UseAuthContext';

import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipesList from './pages/RecipesList';
import Register from './pages/Register';
function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <FavoriteRecipesProvider>
          <ThemeProvider>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<RecipesList />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/favorites" element={<FavoriteRecipes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          </ThemeProvider>
        </FavoriteRecipesProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
