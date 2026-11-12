import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login'; import { Overview } from './pages/Overview'; import { Ledger } from './pages/Ledger'; import { Analytics } from './pages/Analytics';
function ProtectedRoutes(){const {user}=useAuth();if(!user)return <Navigate to="/login" replace/>;return <Routes><Route element={<Layout/>}><Route index element={<Overview/>}/><Route path="ledger" element={<Ledger/>}/><Route path="analytics" element={<Analytics/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>;}
function AppRoutes(){const {user}=useAuth();return <Routes><Route path="/login" element={user?<Navigate to="/" replace/>:<Login/>}/><Route path="/*" element={<ProtectedRoutes/>}/></Routes>;}
export default function App(){return <BrowserRouter><AuthProvider><AppRoutes/></AuthProvider></BrowserRouter>;}
