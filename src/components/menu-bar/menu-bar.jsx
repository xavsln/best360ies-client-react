import React from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';

export function MenuBar({ user }) {
  // console.log('User from the MenuBar: ', user);
  // check if user is logged in
  // console.log('userData from the MenuBar: ', localStorage.getItem('userData'));

  // let userDataCollect = localStorage.getItem('userData');

  // let currentUserId = userDataCollect;
  // console.log('Current User Id: ', localStorage.getItem('_id'));

  const isloggedin = () => {
    // We check if there is a token in our browser
    let accessToken = localStorage.getItem('token');

    if (typeof window == 'undefined') {
      return false;
    }

    if (accessToken) {
      // console.log('User is logged in');
      return accessToken;
    } else {
      // console.log('User is not logged in');
      return false;
    }
  };

  const onLoggedOut = () => {
    // Remove the saved used data from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('_id');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('birthday');
    localStorage.removeItem('userData');
    localStorage.removeItem('favoritePanos');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">Best360ies</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home |</Nav.Link>

              {/* <Nav.Link href="/addpano">Add a Pano |</Nav.Link> */}

              {!isloggedin() && <Nav.Link href="/">Login |</Nav.Link>}
              {!isloggedin() && <Nav.Link href="/register">Sign-up</Nav.Link>}

              {isloggedin() && (
                <NavDropdown title={user} id="user-nav-dropdown">
                  {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}

                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>



                <NavDropdown.Divider />

                {/* Logout navigation link */}

                  <NavDropdown.Item onClick={onLoggedOut} href="/">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
