import {
  Box,
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Avatar,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useUIStore } from "../../store/ui";
import { useAuthStore } from "../../store/auth";

const drawerWidth = 250;

export default function AppLayout() {
  const { drawerOpen, toggleDrawer } = useUIStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pages = [
    { to: "/dashboard", label: "Dashboard", icon: <DashboardOutlinedIcon /> },
    { to: "/positions", label: "Positions", icon: <TableChartOutlinedIcon /> },
    { to: "/rules", label: "Rules", icon: <GavelOutlinedIcon /> },
    { to: "/breaches", label: "Breaches", icon: <ReportProblemOutlinedIcon /> },
    { to: "/audit", label: "Audit", icon: <FactCheckOutlinedIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color="default" sx={{ zIndex: (template) => template.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Regula</Typography>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">v0.1.0</Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 50,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          transition: 'width 0.3s',
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <List>
          {pages.map((item) => (
            <ListItemButton
              key={item.to}
              selected={pathname.startsWith(item.to)}
              onClick={() => navigate(item.to)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1">{user?.name}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
              <Typography variant="subtitle2">{user?.role}</Typography>
            </Box>
          </Box>
          <Button variant="outlined" fullWidth onClick={logout}>
            Sign Out
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}