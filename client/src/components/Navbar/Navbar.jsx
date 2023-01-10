import React, { cloneElement, useState, useEffect } from "react";
import jwt from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import axios from "axios";

export default function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const [userID, setUserID] = useState();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cart, setCart] = useState([]);
  const cartUrl = "http://localhost:4242/api/userCart";
  const navi = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser();
  };
  const logout = () => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      localStorage.removeItem("token");
      navi("/login");
      window.location.reload(false);
    }
  };

  const getCartByUser = async () => {
    const res = await axios.get(`${cartUrl}/${userID}`);
    if (!res) return;
    setCart(res.data);
  };
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwt(hasToken);
      setUserInfo(info);
      setUserID(info.idUser);
      // console.log(info.idUser);
    }
    getCartByUser();
  }, [userID]);
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#3B3B3B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
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
              <Link to="/">
                <i class="fa-solid fa-ticket"></i>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Typography textAlign="center">pagina1</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">pagina1</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">pagina1</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h3"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <Link to="/" className="logoTicket">
                <i class="fa-solid fa-ticket"></i>
              </Link>
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              {userInfo ? (
                <>
                  <Tooltip title="Ver Carrinho">
                    <IconButton sx={{ p: 0, marginRight: 3, marginLeft: -3 }}>
                      <Link to={"/cart/" + userInfo.idUser}>
                        <Badge badgeContent={cart.length} color="info">
                          <ShoppingCartIcon color="secondary" />
                        </Badge>
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Abrir Definições">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="userImg"
                        src="https://www.w3schools.com/w3css/img_avatar3.png"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography textAlign="center">
                        <Link
                          to="/account"
                          onClick={handleCloseUserMenu}
                          className="linkUserMenu"
                        >
                          Meu Perfil
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                ""
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
