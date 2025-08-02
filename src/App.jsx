import React from 'react';
import { useRoutes } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'
import PostDetails from './pages/PostDetails';
import NewPost from './pages/NewPost';
import HomePage from './pages/HomePage';

const App = () => {
  
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<HomePage />
    },
    {
      path:"/details/:id",
      element: <PostDetails />
    },
    {
      path:"/new",
      element: <NewPost />
    }
  ]);

  return (
    <>
      <NavBar />
        {element}
    </>
  )
}

export default App
