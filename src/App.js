import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './Auth/FirebaseConfig';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Auth/Login';
import Register from './Auth/Register';
import GreenSquares from "./GreenSquares";
import {NavDropdown} from "react-bootstrap";
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Didn't spend</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/about">
                                Abouts
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login" element={<Login />} >
                                Login
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>

            </Navbar>
            <Navbar user={user} />
            <Routes>
                <Route path="/" element={<GreenSquares />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
