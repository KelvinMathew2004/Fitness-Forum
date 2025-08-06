import React from 'react';
import { useRoutes } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';
import HomePage from './pages/HomePage';

const App = () => {
  
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
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <NewPost />
    }
  ]);

  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        {element}
      </main>
    </div>
  )
}

export default App
