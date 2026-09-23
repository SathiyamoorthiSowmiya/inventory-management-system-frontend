import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import StockLog from './pages/StockLog';
import './App.css';

function App() {
    return (
        <div className="app">
            <Navbar />

            <main className="app-main">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/categories"
                        element={
                            <ProtectedRoute>
                                <Categories />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/stock"
                        element={
                            <ProtectedRoute>
                                <StockLog />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
