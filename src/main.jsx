import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Protector, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPost from "./pages/AllPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Protector authentication={false}>
                    <Login />
                </Protector>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protector authentication={false}>
                    <Signup />
                </Protector>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protector authentication>
                    {" "}
                    <AllPost />
                </Protector>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protector authentication>
                    {" "}
                    <AddPost />
                </Protector>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protector authentication>
                    {" "}
                    <EditPost />
                </Protector>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)