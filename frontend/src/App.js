import './App.css';
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import LandingPage from './Screens/LandingPage/LandingPage';
import MyBooks from './Screens/MyBooks/MyBooks'
import AllBooks from './Screens/AllBooks/AllBooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from './Screens/EditProfileScreen/EditProfileScreen';
import SearchBooksScreen from './Screens/SearchBooksScreen/SearchBooksScreen';

const App = () => (
  <>
  <BrowserRouter>
    <Header />
    <main>
    <Routes>
    <Route path='/' exact element={<LandingPage />} />
    <Route path='/login' exact element={<LoginScreen />} />
    <Route path='/profile' exact element={<ProfileScreen />} />
    <Route path='/editprofile' exact element={<EditProfileScreen />} />
    <Route path='/register' exact element={<RegisterScreen />} />
    <Route path='/mybooks' exact element={<MyBooks />} />
    <Route path='/searchbooks' exact element={<SearchBooksScreen />} />
    <Route path='/allbooks' exact element={<AllBooks />} />
    </Routes>
    </main>
    <Footer />
    </BrowserRouter>
  </>
)

export default App;