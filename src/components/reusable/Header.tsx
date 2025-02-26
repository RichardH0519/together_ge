import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import geLogo from "../../assets/logo.png";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// Define navigation items
const navItems = [
  { id: "home", label: "Home", path: "/" },
  {
    id: "negotiation",
    label: "Negotiation",
    items: [
      { id: "negotiation-guides", label: "Guides", path: "/guide" },
      { id: "simulator", label: "Simulator", path: "/avatar" },
    ],
  },
  { // dropdown menu
    id: "paygap",
    label: "Paygap",
    items: [
      { id: "paygap-factor", label: "Paygap Factor", path: "/factor" },
      { id: "salary-comparator", label: "Salary Comparator", path: "/comparator" },
      { id: "opportunity-list", label: "Opportunity List", path: "/opportunity" }
    ],
  },
];

export default function Header() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState<string>("");

  useEffect(() => {
    const currentItem = navItems
      .flatMap((item) => (item.items ? item.items : item)) // flatten dropdowns
      .find((item) => item.path === location.pathname);

    if (currentItem) {
      setActiveNav(currentItem.id);
    }
  }, [location.pathname]);

  const removeActive = () => {
    setActiveNav("");
  };

  return (
    <header>
      <Navbar className="custom-navbar fixed-top" expand="lg">
        <Container>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand
              onClick={removeActive}
              className="fw-bold px-2"
            >
              <img
                src={geLogo}
                alt="GELogo"
                style={{ width: "auto", height: "56px" }}
              />
              <span className="ms-3">TogetherGE</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarMain" />
          <Navbar.Collapse id="navbarMain">
            <Nav className="ms-auto">
              {navItems.map((item) =>
                !item.items ? ( // Handle standalone link like "Home"
                  <Nav.Item key={item.id}
                  className="p-2"
                  >
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      active={activeNav === item.id}
                      className={`nav-link p-2 ${activeNav === item.id ? "active" : ""}`}
                    >
                      {item.label}
                    </Nav.Link>
                  </Nav.Item>
                ) : ( // Handle dropdowns
                  <NavDropdown
                    title={item.label}
                    id={item.id}
                    key={item.id}
                    // className="p-2"
                    className={`p-2 ${activeNav === item.id ? "active" : ""}`}
                  >
                    {item.items.map((subItem) => (
                      <NavDropdown.Item
                        as={Link}
                        to={subItem.path}
                        key={subItem.id}
                        active={activeNav === subItem.id}
                      >
                        {subItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
