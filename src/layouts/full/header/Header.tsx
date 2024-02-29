import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// import { IconBellRinging, IconMenu } from "@tabler/icons-react";
const Profile = dynamic(() => import("./Profile"), { ssr: false });

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const [state, setState] = useState<RootState>();
  const rootState = useSelector((state: RootState) => state);

  useEffect(() => {
    setState(rootState);
  });

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          {/* <IconMenu width="20" height="20" /> */}
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          {/* <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge> */}
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {state && (
              <>
                {state?.auth?.loggedIn ? (
                  <>{"Hi, " + state?.auth?.data?.user.email?.match(/^(.+)@gmail.com$/)[1]}</>
                ) : (
                  <></> // or any other placeholder if needed
                )}
              </>
            )}
          
          <Profile auth={state?.auth} />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
