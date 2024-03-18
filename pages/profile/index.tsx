import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Typography,
  Card,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { IconShield, IconShieldCheck } from "@tabler/icons-react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import FullLayout from "../../src/layouts/full/FullLayout";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getDateFromString } from "../../utils/auth";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import { getDoctorDetails } from "../../actions/doctors";
import {
  IconBuilding,
  IconHealthRecognition,
  IconId,
  IconMapPin,
  IconMan,
} from "@tabler/icons-react";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginLeft: theme.spacing(5),
  marginTop: theme.spacing(15),
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
  const dispatch: AppDispatch = useDispatch();
  const [state, setState] = useState<any>();
  const rootState = useSelector((state: RootState) => state?.auth?.data?.user);
  const userState = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    if (state?.id > 0) {
      dispatch(getDoctorDetails(state?.id));
    }
    setState(rootState);
  }, []);

  return (
    <PageContainer title="My Profile" description="this is profile page">
      {state && (
        <>
          <DashboardCard title="My Profile">
            <VerificationStatus>
              <StatusIcon verified={state?.status}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: state?.status ? "7.5rem" : "9.5rem",
                    backgroundColor:
                      state?.status === "VERIFIED" ? "green" : "#e65100",
                    padding: "5px 5px 5px 10px",
                  }}
                  elevation={0}
                >
                  {state?.status === "VERIFIED" ? (
                    <IconShieldCheck color="white" />
                  ) : (
                    <IconShield color="white" />
                  )}
                  <Typography
                    variant="h6"
                    style={{ color: "white", padding: "5px 10px 5px 5px" }}
                  >
                    {state?.status === "VERIFIED" ? "VERIFIED" : " UNVERIFIED"}
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
          <DashboardCard title="Acccount Details">
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>
                  Email
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${state?.email}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText>
                  Joined on
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${getDateFromString(state?.created_at)}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText>
                  Phone Number
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${state?.phone}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText>
                  Account Permission
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${state?.permission}`}</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </DashboardCard>
          <DashboardCard title="Professional Details">
            <List>
              <ListItem>
                <ListItemIcon>
                  <IconBuilding />
                </ListItemIcon>
                <ListItemText>
                  Department
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${userState?.data?.department}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconHealthRecognition />
                </ListItemIcon>
                <ListItemText>
                  Designation
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${userState?.data?.designation}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconId />
                </ListItemIcon>
                <ListItemText>
                  License Number
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${userState?.data?.doctor_details?.license_number}`}</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </DashboardCard>
          <DashboardCard title="Personal Details">
            <List>
              <ListItem>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText>
                  Date of Birth
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${getDateFromString(
                    userState?.data?.doctor_details?.DOB
                  )}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconMapPin />
                </ListItemIcon>
                <ListItemText>
                  Address
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${userState?.data?.doctor_details?.city} ${userState?.data?.doctor_details?.district} ${userState?.data?.doctor_details?.state}, Pin: ${userState?.data?.doctor_details?.pincode}`}</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IconMan />
                </ListItemIcon>
                <ListItemText>
                  Gender
                  <Typography
                    variant="body1"
                    color="#1976d2"
                  >{`${userState?.data?.doctor_details?.gender}`}</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </DashboardCard>
        </>
      )}
    </PageContainer>
  );
};

export default MyProfilePage;
MyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
