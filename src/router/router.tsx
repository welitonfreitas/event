import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';

import Event from '../modules/event/components/EventPage'
import EventList from '../modules/event/components/EventList'
import EventForm  from '../modules/event/components/EventForm'
import EventSubscribe from '../modules/event/components/EventSubscribe'

import ProfilePage from '../modules/profille/components/ProfilePage'
import ProfileForm from '../modules/profille/components/ProfileForm'


import ErrorPage from '../pages/ErrorPage'
import BrowserLayout from '../layout/layout'
import ProtectedRoute from './ProtectedRoute'

const Layout = BrowserLayout

const Router = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} errorElement={<ErrorPage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/event/:id" element={<Event />} />
                    <Route path="/event/:id/edit" element={<ProtectedRoute><EventForm /></ProtectedRoute>} />
                    <Route path="/event/:id/subscribe" element={<ProtectedRoute><EventSubscribe /></ProtectedRoute>} />
                    <Route path="/event/new" element={<ProtectedRoute><EventForm /> </ProtectedRoute> } />
                    <Route path="/events" element={<EventList />} />

                    <Route path="/profile/" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/profile/edit" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
                    
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
}

export default Router