import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Autocomplete,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import PageContainer from "../../src/components/container/PageContainer";
import FullLayout from "../../src/layouts/full/FullLayout";
import DashboardCard from "../../src/components/shared/DashboardCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getAllDoctorsDetails } from "../../actions/doctors";
import StickyHeadTable from "../../src/components/table/table";

interface doctor {
  name: string;
  phoneNumber: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  city: string;
  district: string;
  pincode: number;
  state: string;
  email: string;
}

const FloatingButtonContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000,
});

const SamplePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state?.auth?.loggedIn);
  const userState = useSelector((state: RootState) => state?.user?.data);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<doctor[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [selecteddoctor, setSelecteddoctor] = useState<doctor | null>(null);
  const [isNewdoctorDialogOpen, setIsNewdoctorDialogOpen] =
    useState<boolean>(false);
  const [newdoctorDetails, setNewdoctorDetails] = useState<Partial<doctor>>({});
  // Dummy doctor data for demonstration
  const [doctors, setDoctors] = useState([]);

  // Function to handle search by name
  const handleNameSearch = (name: string) => {
    const matcheddoctors = doctors.filter((doctor) =>
      doctor?.doctor_details?.name.toLowerCase().includes(name.toLowerCase())
    );
    setSearchResults(matcheddoctors);
  };

  // Function to handle search by phone number
  const handlePhoneSearch = (phone: string) => {
    const matcheddoctor = doctors.find(
      (doctor) => doctor?.doctor_contact?.phone === phone
    );
    setSearchResults(matcheddoctor ? [matcheddoctor] : []);
  };

  // Function to handle search
  const handleSearch = () => {
    if (!selecteddoctor) {
      if (!isNaN(Number(searchQuery)) && searchQuery.length === 10) {
        handlePhoneSearch(searchQuery);
      } else {
        handleNameSearch(searchQuery);
      }
    }
  };

  // Function to reset search
  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelecteddoctor(null);
  };

  // Function to handle opening the new doctor dialog
  const handleOpenNewdoctorDialog = () => {
    setIsNewdoctorDialogOpen(true);
  };

  // Function to handle closing the new doctor dialog
  const handleCloseNewdoctorDialog = () => {
    setIsNewdoctorDialogOpen(false);
  };

  // Function to handle submission of the new doctor form
  const handleNewdoctorSubmit = () => {
    // Implement logic to handle submission of new doctor form
    // Here you can save newdoctorDetails to your database or perform other actions
    console.log("New doctor details:", newdoctorDetails);
    // Close the dialog after submission
    setIsNewdoctorDialogOpen(false);
    // Clear newdoctorDetails state
    setNewdoctorDetails({});
  };

  useEffect(() => {
    if (authState) {
      dispatch(getAllDoctorsDetails());
      setDoctors(userState?.data);
    }
  }, []);

  return (
    <PageContainer title="Doctor" description="This is doctors page">
      <DashboardCard title="Doctor | Find Details & Create New Entry">
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Autocomplete
                options={nameSuggestions}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                )}
                // onInputChange={(event, newValue) => {
                //   setSearchQuery(newValue);
                //   setNameSuggestions(
                //     doctors
                //       .map((doctor) => doctor?.name)
                //       .filter((name) =>
                //         name.toLowerCase().includes(newValue.toLowerCase())
                //       )
                //   );
                // }}
                inputValue={searchQuery}
                // onChange={(event, newValue) => {
                //   if (newValue) {
                //     const founddoctor = doctors.find(
                //       (doctor) => doctor?.name === newValue
                //     );
                //     setSelecteddoctor(founddoctor || null);
                //   } else {
                //     setSelecteddoctor(null);
                //   }
                //   setSearchQuery(newValue || "");
                // }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={selecteddoctor ? selecteddoctor.phoneNumber : ""}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                disabled={!!selecteddoctor}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={handleSearch}>
                Get doctor Details
              </Button>
              <Button variant="contained" onClick={resetSearch}>
                Reset Details
              </Button>
            </Grid>
          </Grid>

          {/* Tile for creating a new doctor */}
          <FloatingButtonContainer>
            <Button variant="contained" onClick={handleOpenNewdoctorDialog}>
              + Create New doctor
            </Button>
          </FloatingButtonContainer>

          {/* New doctor dialog */}
          <Dialog
            open={isNewdoctorDialogOpen}
            onClose={handleCloseNewdoctorDialog}
          >
            <DialogTitle>Create New doctor</DialogTitle>
            <DialogContent>
              {/* Form for entering new doctor details */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.name || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.email || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.phoneNumber || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Liscence Number"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.aadharNumber || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        aadharNumber: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={newdoctorDetails.dateOfBirth || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.age || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        age: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.city || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        city: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.state || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        state: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="District"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.district || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        district: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    value={newdoctorDetails.pincode || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        pincode: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={newdoctorDetails.gender || ""}
                    onChange={(e) =>
                      setNewdoctorDetails({
                        ...newdoctorDetails,
                        gender: e.target.value as string,
                      })
                    }
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseNewdoctorDialog} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={handleNewdoctorSubmit}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </DashboardCard>

      <DashboardCard>
        <StickyHeadTable rows={doctors} />
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

SamplePage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
