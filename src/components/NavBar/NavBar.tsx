import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import PrestamosDialog from "../../pages/Loans/PrestamosDialog";

const pages = ["Prestamos", "Libros", "Estudiantes"];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openPrestamosDialog, setOpenPrestamosDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleSectionClick = (section: string): void => {
    if (section === "Prestamos") {
      setOpenPrestamosDialog(true);
    }else if(section === "Libros"){
      navigate("/libros");
    }
    setActiveSection((prevSection) =>
      section === prevSection ? null : section
    );
  };

  const handleClosePrestamosDialog = (): void => {
    setOpenPrestamosDialog(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0271df" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleSectionClick(page)}>
                    <Typography>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "#0271df",
                    },
                    backgroundColor:
                      activeSection === page ? "#0271df" : "transparent",
                  }}
                  onClick={() => handleSectionClick(page)}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="User" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <PrestamosDialog
        open={openPrestamosDialog}
        onClose={handleClosePrestamosDialog}
      />
    </>
  );
}
