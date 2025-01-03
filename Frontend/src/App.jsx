import './App.css'
import { Route, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Layout from './components/Layout';
import Register from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesForm from './components/PlacesForm';
import SinglePlacePage from './pages/SinglePlacePage';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<SinglePlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
