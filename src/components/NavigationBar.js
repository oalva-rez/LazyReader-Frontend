import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import lazyReaderLogo from "../assets/lazyreaderlogo.png";

export default function NavigationBar({ apiData }) {
  return (
    <Navbar className="nav-custom" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={lazyReaderLogo} alt="lazy reader" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Subreddits" id="basic-nav-dropdown">
              {apiData.map((subreddit) => (
                <NavDropdown.Item
                  href={`/${subreddit.name}`}
                  key={subreddit?._id}
                >
                  {subreddit?.name[0].toUpperCase() + subreddit?.name.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
