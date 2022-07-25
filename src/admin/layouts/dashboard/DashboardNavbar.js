import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { addPainting } from "../../api/manage";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg") && !window.location.href.includes("ed")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  let edPage = false;
  if (window.location.href.includes("ed")) {
    edPage = true;
  }
  let location = useLocation();
  const navigate = useNavigate();
  const onAddPaintingClick = () => {
    addPainting({
        UserId: sessionStorage.getItem("username"),
      }, (res) =>
        navigate(`/dashboard/ed/${res.data.id}`, {
          replace: true,
          state: {
            name: res.data.name != null ?res.data.name:"",
          }
        }),
    );
  };

  return (
    <RootStyle>
      {/*头部导航*/}
      <ToolbarStyle>
        <MHidden width="lgUp" name={edPage ? "edUp" : "other"}>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>

          <Typography variant="h6">{ location.state != null ? location.state.name : ""}</Typography>
        </MHidden>

        {/*<Searchbar />*/}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/*<LanguagePopover />*/}
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={onAddPaintingClick}
          >
            新增作品
          </Button>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
