import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useContext} from "react";
import {AuthContext} from "../Auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "../Services/CurrentUserService.tsx";
import {useLogin} from "../Services/LoginInProvider.tsx";

function Header() {
    const { setCurrentUser } = useCurrentUser();

    const {logOut, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoggedIn } = useLogin();

    const handleSignOut = async () => {
        try {
            await logOut();
            console.log('User logged out successfully');
            navigate('/login');
            setCurrentUser(null);


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">DNTSPNT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                    </Nav>
                    { isLoggedIn ?? (
                    <Nav>
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">
                                About
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                   <a onClick={handleSignOut}>Logout</a>
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>) }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;