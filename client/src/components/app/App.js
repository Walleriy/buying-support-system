import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "../../routes/routes";
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/AuthContext";
import {Navbar} from "../navbar/Navbar";
import './App.css';
import 'materialize-css'
import {Loader} from "../loader/Loader";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                { isAuthenticated && <Navbar /> }
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
