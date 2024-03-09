import type { ReactElement } from "react";
import React, { useState } from "react";
import {
  Grid,
  Box,
  Card,
  Modal,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import PageContainer from "../../../src/components/container/PageContainer";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";
import AuthVerify from "../auth/AuthVerify";

const Verify = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // Check for large screens (lg breakpoint)
  const [open, setOpen] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setOpen(false);
    setAgreed(true);
  };

  const handleNotAgree = () => {
    setOpen(true);
    setAgreed(false);
    window.location.href = "/authentication/register";
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <Modal open={open}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // transform: "translate(-50%, -50%)",
            maxWidth: "90vw", // Limit the maximum width of the modal to 90% of the viewport width
            backgroundColor: "white",
            padding: "20px",
            overflowY: "auto", // Add vertical scroll if content exceeds modal height
            maxHeight: "90vh", // Limit the maximum height of the modal to 90% of the viewport height
            textAlign: "left", // Align text to the left for better readability
          }}
        >
          <Typography variant="h5" gutterBottom>
            Terms and Conditions
          </Typography>
          <ul>
            <li>
              Access and use of the Website signify agreement to these terms.
            </li>
            <li>Unauthorized access or use is strictly prohibited.</li>
            <li>
              The Website is for doctors, patients, and administrators of AIMMS
              Chamiana Multi-Speciality Hospital Shimla.
            </li>
            <li>
              Information provided is for general informational purposes only,
              not medical advice.
            </li>
            <li>
              Users are responsible for decisions made based on this
              information.
            </li>
            <li>
              Collection and use of personal and non-personal information
              outlined.
            </li>
            <li>
              Confidentiality and security of user information maintained.
            </li>
            <li>
              Personal data not disclosed to third parties without explicit
              consent, except as required by law.
            </li>
            <li>
              Users have rights to review, update, or delete personal
              information.
            </li>
            <li>Use of cookies to enhance user experience.</li>
            <li>
              Cookies may be used for analytical purposes to improve Website
              functionality and content.
            </li>
            <li>
              Terms and Conditions, Privacy Policy, and Cookie Policy may be
              updated without prior notice.
            </li>
            <li>Continued use implies acceptance of any modifications.</li>
            <li>
              The Cardiology Department reserves the right to suspend or
              terminate access for users violating these terms.
            </li>
          </ul>
          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={handleAgree} />}
            label="I agree to the terms and conditions"
          />
          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={handleNotAgree} />}
            label="I do not agree to the terms and conditions"
          />
        </div>
      </Modal>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundImage: `url(/images/profile/cardio-bg.jpeg)`,
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            // opacity: "0.5",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            height: "100vh",
            ...(isLargeScreen && {
              marginLeft: "10%",
              justifyContent: "",
            }),
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthVerify />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Verify;

Verify.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
