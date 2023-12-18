import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SidebarItem from "./SidebarItem";
import user from "../assets/images/user.png";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const url = window.location.pathname;
  const endpoint = url.substring(url.lastIndexOf("/") + 1);
  const currentPageName = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

  const [selected, setSelected] = useState(currentPageName || "Dashboard");

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderLogoAndMenuIcon = () => {
    return (
      <MenuItem
        onClick={handleToggleCollapse}
        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
        style={{
          margin: "10px 0 20px 0",
          color: colors.grey[100],
        }}
      >
        {!isCollapsed && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
          >
            <Typography variant="h3" color={colors.grey[100]}>
              ADMIN
            </Typography>
            <IconButton onClick={handleToggleCollapse}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </MenuItem>
    );
  };

  const renderProfileSection = () => {
    if (isCollapsed) return null;

    return (
      <Box mb="25px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={user}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
          >
            Issam
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            Syndic
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderDataSection = () => {
    const items = [
      {
        title: "Apartments",
        to: "/apartments",
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "Residents",
        to: "/residents",
        icon: <PeopleOutlinedIcon />,
      },
      {
        title: "Payments",
        to: "/payments",
        icon: <ReceiptOutlinedIcon />,
      },
    ];
    return (
      <>
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Data
        </Typography>
        {items.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </>
    );
  };

  const renderPagesSection = () => {
    const items = [
      {
        title: "Profile",
        to: "/profile",
        icon: <PersonOutlinedIcon />,
      },
      {
        title: "Calendar",
        to: "/calendar",
        icon: <CalendarTodayOutlinedIcon />,
      },
      {
        title: "FAQ Page",
        to: "/faq",
        icon: <HelpOutlineOutlinedIcon />,
      },
    ];
    return (
      <>
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Pages
        </Typography>
        {items.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </>
    );
  };

  const renderChartsSection = () => {
    const items = [
      {
        title: "Bar Chart",
        to: "/bar",
        icon: <BarChartOutlinedIcon />,
      },
      {
        title: "Pie Chart",
        to: "/pie",
        icon: <PieChartOutlineOutlinedIcon />,
      },
      {
        title: "Line Chart",
        to: "/line",
        icon: <TimelineOutlinedIcon />,
      },
    ];
    return (
      <>
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Charts
        </Typography>
        {items.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {renderLogoAndMenuIcon()}
          {renderProfileSection()}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {renderDataSection()}
            {renderPagesSection()}
            {renderChartsSection()}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
