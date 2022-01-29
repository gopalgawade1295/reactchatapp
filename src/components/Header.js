import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

function Header({ isAuth, setIsAuth }) {
    let history = useHistory()

    const LogOut = () => {
        auth.signOut()
            .then((response) => {
                localStorage.clear()
                setIsAuth(false)
                history.push('/login')
            })
    }

    return <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!isAuth ? (<Navbar.Brand as={NavLink} to="/login">&emsp;&emsp;LOGIN</Navbar.Brand>) :
                        (<Nav>
                            <Nav.Link as={NavLink} to="/">CHAT</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" onClick={LogOut}>LOGOUT</Nav.Link>
                        </Nav>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>;
}

export default Header;
