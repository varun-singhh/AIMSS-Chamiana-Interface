import React, { useEffect, useState } from "react";
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
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";

import { styled } from "@mui/material/styles";
import PageContainer from "../../src/components/container/PageContainer";
import FullLayout from "../../src/layouts/full/FullLayout";
import DashboardCard from "../../src/components/shared/DashboardCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createNewDoctor, getAllDoctorsDetails } from "../../actions/doctors";
import StickyHeadTable from "../../src/components/table/table";
import { useRouter } from "next/router";

interface doctor {
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  block: string;
  district: string;
  pincode: number;
  state: string;
  email: string;
  designation: string;
}

const FloatingButtonContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000,
});

const SamplePage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const pageLoading = useSelector((state: RootState) => state?.user?.loading);
  const authState = useSelector((state: RootState) => state?.auth?.loggedIn);
  const userState = useSelector((state: RootState) => state?.user?.data);
  const errState = useSelector(
    (state: RootState) => state?.error?.data?.errors
  );

  const [pageloader, setPageloader] = useState(true);
  const [searchNameQuery, setNameSearchQuery] = useState<string>("");
  const [searchPhoneQuery, setPhoneSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<doctor[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [selecteddoctor, setSelecteddoctor] = useState<doctor | null>(null);
  const [newdoctorDetails, setNewdoctorDetails] = useState<Partial<doctor>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<doctor[]>([]);
  const [isNewdoctorDialogOpen, setIsNewdoctorDialogOpen] =
    useState<boolean>(false);

  // Function to handle search by name
  const handleNameSearch = (name: string) => {
    const regex = new RegExp(name, "i"); // 'i' flag for case-insensitive search
    const matcheddoctors = doctors.filter((doctor) =>
      regex.test(doctor?.doctor_details?.name)
    );
    console.log(matcheddoctors);
    setSearchResults(matcheddoctors);
  };

  // Function to handle search by phone number
  const handlePhoneSearch = (phone: string) => {
    const regex = new RegExp(phone);
    const matcheddoctors = doctors.filter((doctor) =>
      regex.test(doctor?.doctor_contact?.phone)
    );
    setSearchResults(matcheddoctors);
  };

  // Function to handle search
  const handleSearch = () => {
    if (!selecteddoctor) {
      if (searchPhoneQuery != "") {
        handlePhoneSearch(searchPhoneQuery);
      } else {
        handleNameSearch(searchNameQuery);
      }
    }
  };

  // Function to reset search
  const resetSearch = () => {
    setNameSearchQuery("");
    setPhoneSearchQuery("");
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
    setButtonLoading(true);
    // Implement logic to handle submission of new doctor form
    // Here you can save newdoctorDetails to your database or perform other actions
    dispatch(
      createNewDoctor({
        doctor_details: {
          name: `Dr. ` + newdoctorDetails?.name,
          DOB: newdoctorDetails?.dateOfBirth,
          age: newdoctorDetails.age?.toString(),
          block: newdoctorDetails?.block,
          state: newdoctorDetails?.state,
          district: newdoctorDetails?.district,
          pincode: newdoctorDetails?.pincode?.toString(),
          gender: newdoctorDetails?.gender,
          license_number: newdoctorDetails?.licenseNumber,
        },
        doctor_contact: {
          email: newdoctorDetails?.email,
          phone: newdoctorDetails?.phoneNumber,
        },
        department: "Cardiology",
        designation: newdoctorDetails?.designation,
      })
    );
  };

  useEffect(() => {
    if (authState) {
      dispatch(getAllDoctorsDetails());
    }
  }, [authState, dispatch]);

  useEffect(() => {
    if (userState) {
      setDoctors(userState?.data ?? []);
      setLoading(false); // Set loading to false once data is available
    }
  }, [userState]);

  useEffect(() => {
    if (errState === undefined || errState?.length == 0) {
      dispatch(getAllDoctorsDetails());
      // Close the dialog after submission
      setIsNewdoctorDialogOpen(false);
      // Clear newdoctorDetails state
      setNewdoctorDetails({});

      setButtonLoading(false);
    } else {
      setButtonLoading(false);
    }
  }, [errState]);

  useEffect(() => {
    if (searchNameQuery === "" && searchPhoneQuery === "") {
      resetSearch();
    }
  }, [searchNameQuery, searchPhoneQuery]);

  useEffect(() => {
    setPageloader(pageLoading);
  }, [pageLoading]);

  return (
    <>
      {!pageloader ? (
        <PageContainer title="Doctor" description="This is doctors page">
          <DashboardCard title="Doctor Management Panel">
            <>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    options={nameSuggestions}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search doctor by name"
                        variant="outlined"
                        fullWidth
                        value={searchNameQuery}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        onChange={(e) => {
                          setNameSearchQuery(e.target.value);
                          handleSearch();
                        }}
                      />
                    )}
                    onInputChange={(event, newValue) => {
                      setNameSearchQuery(newValue);
                      setNameSuggestions(
                        doctors
                          .map((doc) => doc?.doctor_details?.name)
                          .filter((name) =>
                            name.toLowerCase().includes(newValue.toLowerCase())
                          )
                      );
                    }}
                    inputValue={searchNameQuery}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Search doctor by phone number"
                    variant="outlined"
                    fullWidth
                    value={searchPhoneQuery}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    onChange={(e) => {
                      setPhoneSearchQuery(e.target.value);
                      handleSearch();
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={resetSearch}>
                Reset Details
              </Button>
            </Grid> */}
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
                        type="email"
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
                        value={newdoctorDetails.licenseNumber || ""}
                        onChange={(e) =>
                          setNewdoctorDetails({
                            ...newdoctorDetails,
                            licenseNumber: e.target.value,
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
                        label="Block"
                        variant="outlined"
                        fullWidth
                        value={newdoctorDetails.block || ""}
                        onChange={(e) =>
                          setNewdoctorDetails({
                            ...newdoctorDetails,
                            block: e.target.value,
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
                      <Select
                        label="Select Gender"
                        renderValue={(selected) => selected || `Select Gender`}
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
                    <Grid item xs={6}>
                      <TextField
                        label="Designation"
                        variant="outlined"
                        fullWidth
                        value={newdoctorDetails.designation || ""}
                        onChange={(e) =>
                          setNewdoctorDetails({
                            ...newdoctorDetails,
                            designation: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  {!buttonLoading && errState?.length > 0 ? (
                    <Typography color="red" px={2} py={2}>
                      {errState?.[0]?.reason}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </DialogContent>

                <DialogActions>
                  {buttonLoading ? (
                    <CircularProgress
                      style={{ margin: "10px auto", display: "block" }}
                    />
                  ) : (
                    <>
                      <Button
                        onClick={handleCloseNewdoctorDialog}
                        color="inherit"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleNewdoctorSubmit}
                        color="primary"
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>
            </>
          </DashboardCard>

          {/* Conditional rendering of loader or table */}
          {loading ? (
            <CircularProgress
              style={{ margin: "20px auto", display: "block" }}
            />
          ) : (
            <>
              {searchResults.length > 0 ? (
                <StickyHeadTable rows={searchResults} category={"doctors"} />
              ) : (
                <StickyHeadTable rows={doctors} category={"doctors"} />
              )}
            </>
          )}
        </PageContainer>
      ) : (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      )}
    </>
  );
};

export default SamplePage;

SamplePage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
