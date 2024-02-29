import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Typography, Card, Paper, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { IconShield, IconShieldCheck } from "@tabler/icons-react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import FullLayout from "../../src/layouts/full/FullLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDateFromString } from "../../utils/auth";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LockIcon from '@mui/icons-material/Lock';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginLeft: theme.spacing(5),
  marginTop: theme.spacing(18),
  position: "absolute",
  zIndex: theme.zIndex.tooltip + 1,
  border: `5px solid white`,
}));

const VerificationStatus = styled(Paper)(({ theme }) => ({
  width: theme.spacing(15),
  marginLeft: theme.spacing(7),
  marginTop: theme.spacing(7),
  position: "absolute",
  zIndex: theme.zIndex.tooltip + 1,
}));

const StatusIcon = styled("div")(({ theme, status }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  color: status ? "green" : "yellow",
}));

const MyProfilePage = () => {
  const [state, setState] = useState<any>();
  const rootState = useSelector((state: RootState) => state?.auth?.data?.user);

  useEffect(() => {
    setState(rootState);
  });

  console.log(state)

  return (
    <PageContainer title="My Profile" description="this is profile page">
      <DashboardCard title="My Profile">
        <VerificationStatus>
          <StatusIcon verified={state?.status}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                width: state?.status ? "7.5rem" : "9.5rem",
                backgroundColor: state?.status ? "green" : "#b71c1c",
                padding: "5px 5px 5px 10px",
              }}
              elevation={0}
            >
              {state?.status ? (
                <IconShieldCheck color="white" />
              ) : (
                <IconShield color="white" />
              )}
              <Typography
                variant="h6"
                style={{ color: "white", padding: "5px 10px 5px 5px" }}
              >
                {state?.status ? " Verified" : " Not Verified"}
              </Typography>
            </Card>
          </StatusIcon>
        </VerificationStatus>
        <Card
          elevation={0}
          sx={{
            height: "15rem",
            backgroundImage: `url(/images/profile/profile-banner.webp)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <ProfileAvatar src="/images/profile/user-1.jpg" />
        </Card>
      </DashboardCard>
      <DashboardCard>
 <List>
      <ListItem>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText>
            Email
          <Typography variant="body1" color="#1976d2">{`${state?.email}`}</Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText>
            Joined on
          <Typography variant="body1" color="#1976d2">{`${getDateFromString(state?.created_at)}`}</Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText>
            Phone Number
          <Typography variant="body1" color="#1976d2">{`${state?.phone}`}</Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText>
            Account Permission
          <Typography variant="body1" color="#1976d2">{`${state?.permission}`}</Typography>
        </ListItemText>
      </ListItem>
    </List>
      </DashboardCard>
    </PageContainer>
  );
};

export default MyProfilePage;
MyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
