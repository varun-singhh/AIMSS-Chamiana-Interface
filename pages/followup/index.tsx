import type { ReactElement } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import FullLayout from "../../src/layouts/full/FullLayout";

const allFormData = [
  {
    title: "ACS Patient",
    link: "/followup/acs",
  },
  {
    title: "CAD Patient",
    link: "/followup/cad",
  },
  {
    title: "Heart Failure Patient",
    link: "/followup/hf",
  },
  {
    title: "RHD Patient",
    link: "/followup/rhd",
  },
];

const SamplePage = () => {
  return (
    <PageContainer title="Followup Form" description="this is Followup page">
      <DashboardCard title="Followup Forms">
        <Grid container spacing={2}>
          {allFormData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Paper
                href={item.link}
                component={Button}
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  textAlign: "center",
                  height: "250px",
                  width: "250px",
                  borderRadius: "10px",
                  padding: "10px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  },
                  border: "1px solid #DAE0E2",
                }}
              >
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                  {item.title}
                </Typography>
                <Button variant="outlined">Create New</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
SamplePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
