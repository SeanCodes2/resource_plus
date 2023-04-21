import React from 'react'
import './App.css'
// Below are a few react-router-dom components that provide our routing functionality.
//1. BrowserRouter - Router for the app (we must place the Navigation and Routes inside these tags)
//2. Routes - kind of like a switch - details all the Route components inside.
//3. Route - for every Route in our App, we will have a Route component. This gives insructions to the App for
//           what component to display based on the URL path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import Navigation from './components/Navigation'
import Login from './components/Auth/Login'
import Bootstrap from './components/Bootstrap/Bootstrap'
import Routing from './components/Routing/Routing'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Categories from './components/Categories/Categories'
import Resources from './components/Resources/Resources'
import Testing from './testing/Testing'

function App() {
    return (
        <div className='App'>
            <AuthProvider>
                {/* The below component is actually calling the BrowserRouter from react-router-dom, but we made an alias in the import
            We surround the Navigation component becasue it has link components called from react-router-dom package and rendered
            in that component. per the DOCs on their site, Link, routes and the route need to be rendered inside the Router component.
             */}
                <Router>
                    <Navigation />

                    {/* This is like a switch that decides what to render on the screen based on the URL path. */}
                    <Routes>
                        <Route path='/' element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                        <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                        <Route path='/resources' element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/bootstrap' element={<Bootstrap />} />
                        <Route path='/routing' element={<Routing />} />
                        <Route path='/testing' element={<Testing />} />
                        

                        {/* The NotFound component is an error handler and will be tied to any other route than what is listed above.
                all routes listed above this route will have specific paths that are given to them. This route below will be 
                a catch all for the rest of what could be put in the path. */}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>

                {/* {showContent === 'bootstrap' && <Bootstrap />} this is how we routed users last week using conditional rendering
            and a react hook. this week we use react-router-dom (an nmp package) so we can utilize the url path to determine
            what component to show. */}
            </AuthProvider>
        </div>
    )
}

export default App
