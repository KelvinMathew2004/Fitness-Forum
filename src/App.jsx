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
      path:"/post/:id",
      element: <PostDetails />
    },
    {
      path:"/new",
      element: <NewPost />
    }
  ]);

  return (
    <div className="App-layout">
      <NavBar />
      <main className="App-content">
        {element}
      </main>
    </div>
  )
}

export default App
