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
  CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import FullLayout from "../../src/layouts/full/FullLayout";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import StickyHeadTable from "../../src/components/table/table";
import {
  createNewPatient,
  getAllPatientsDetails,
} from "../../actions/patients";
import { useRouter } from "next/router";

interface Patient {
  name: string;
  phoneNumber: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  block: string;
  district: string;
  pincode: number;
  relation: string;
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
  const pageLoading = useSelector((state: RootState) => state?.user?.loading);
  const authState = useSelector((state: RootState) => state?.auth?.loggedIn);
  const userState = useSelector((state: RootState) => state?.user?.data);
  const errState = useSelector(
    (state: RootState) => state?.error?.data?.errors
  );

  const [pageloader, setPageloader] = useState(true);
  const [searchNameQuery, setNameSearchQuery] = useState<string>("");
  const [searchPhoneQuery, setPhoneSearchQuery] = useState<string>("");
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNameField, setShowNameField] = useState<boolean>(false);
  const [relationType, setrelationType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] =
    useState<boolean>(false);
  const [newPatientDetails, setNewPatientDetails] = useState<Partial<Patient>>(
    {}
  );

  // Function to handle search by name
  const handleNameSearch = (name: string) => {
    const regex = new RegExp(name, "i");
    const matchedPatients = patients.filter((patient) =>
      regex.test(patient?.patient_details?.name)
    );
    setSearchResults(matchedPatients);
  };

  // Function to handle search by phone number
  const handlePhoneSearch = (phone: string) => {
    const regex = new RegExp(phone);
    const matchedPatients = patients.filter((patient) =>
      regex.test(patient?.patient_contact?.phone)
    );

    setSearchResults(matchedPatients);
  };

  // Function to handle search
  const handleSearch = () => {
    if (!selectedPatient) {
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
    setSelectedPatient(null);
  };

  // Function to handle opening the new patient dialog
  const handleOpenNewPatientDialog = () => {
    setIsNewPatientDialogOpen(true);
  };

  // Function to handle closing the new patient dialog
  const handleCloseNewPatientDialog = () => {
    setIsNewPatientDialogOpen(false);
  };

  // Function to handle submission of the new patient form
  const handleNewPatientSubmit = () => {
    setButtonLoading(true);

    dispatch(
      createNewPatient({
        patient_details: {
          name: newPatientDetails?.name,
          DOB: newPatientDetails?.dateOfBirth,
          age: newPatientDetails.age?.toString(),
          block: newPatientDetails?.block,
          state: newPatientDetails?.state,
          district: newPatientDetails?.district,
          pincode: newPatientDetails?.pincode?.toString(),
          gender: newPatientDetails?.gender,
          aadhar_number: newPatientDetails?.aadharNumber,
          relation_name: relationType + ` ` + newPatientDetails.relation,
        },
        patient_contact: {
          email: newPatientDetails?.email,
          phone: newPatientDetails?.phoneNumber,
        },
      })
    );
  };

  useEffect(() => {
    if (authState) {
      dispatch(getAllPatientsDetails(""));
    }
  }, [authState, dispatch]);

  useEffect(() => {
    if (userState) {
      setPatients(userState?.data ?? []);
      setLoading(false); // Set loading to false once data is available
    }
  }, [userState]);

  useEffect(() => {
    if (errState === undefined || errState?.length == 0) {
      dispatch(getAllPatientsDetails(""));
      // Close the dialog after submission
      setIsNewPatientDialogOpen(false);
      // Clear newPatientDetails state
      setNewPatientDetails({});

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
    setTimeout(() => {
      setPageloader(false);
    }, 1500);
  }, [pageloader]);

  return (
    <>
      {!pageloader ? (
        <PageContainer title="Patient" description="This is Patients page">
          <DashboardCard title="Patient Management Panel">
            <>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    options={nameSuggestions}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search patient by name"
                        variant="outlined"
                        fullWidth
                        value={searchNameQuery}
                        onChange={(e) => {
                          setNameSearchQuery(e.target.value);
                          handleSearch();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                      />
                    )}
                    onInputChange={(event, newValue) => {
                      setNameSearchQuery(newValue);
                      setNameSuggestions(
                        patients
                          .map((patient) => patient?.patient_details?.name)
                          .filter((name) =>
                            name.toLowerCase().includes(newValue.toLowerCase())
                          )
                      );
                    }}
                    inputValue={searchNameQuery}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        const foundPatient = patients.find(
                          (patient) => patient.name === newValue
                        );
                        setSelectedPatient(foundPatient || null);
                      } else {
                        setSelectedPatient(null);
                      }
                      setNameSearchQuery(newValue || "");
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Search patient by phone number"
                    variant="outlined"
                    fullWidth
                    value={selectedPatient ? selectedPatient.phoneNumber : ""}
                    onChange={(e) => {
                      setPhoneSearchQuery(e.target.value);
                      handleSearch();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    disabled={!!selectedPatient}
                  />
                </Grid>
                {/* <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={handleSearch}>
                Get Patient Details
              </Button>
              <Button variant="contained" onClick={resetSearch}>
                Reset Details
              </Button>
            </Grid> */}
              </Grid>

              {/* Tile for creating a new patient */}
              <FloatingButtonContainer>
                <Button
                  variant="contained"
                  onClick={handleOpenNewPatientDialog}
                >
                  + Create New Patient
                </Button>
              </FloatingButtonContainer>

              {/* New patient dialog */}
              <Dialog
                open={isNewPatientDialogOpen}
                onClose={handleCloseNewPatientDialog}
              >
                <DialogTitle>Create New Patient</DialogTitle>
                <DialogContent>
                  {/* Form for entering new patient details */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={newPatientDetails.name || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.email || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.phoneNumber || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label="Aadhar Card Number"
                        variant="outlined"
                        fullWidth
                        value={newPatientDetails.aadharNumber || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.dateOfBirth || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.age || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.block || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.state || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.district || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                        value={newPatientDetails.pincode || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
                            pincode: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={newPatientDetails.gender || ""}
                        onChange={(e) =>
                          setNewPatientDetails({
                            ...newPatientDetails,
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
                      <InputLabel>Relation</InputLabel>
                      <Select
                        value={newPatientDetails.relation || ""}
                        onChange={(e) => {
                          const selectedRelation = e.target.value as string;
                          if (
                            selectedRelation === "SO" ||
                            selectedRelation === "WO"
                          ) {
                            setShowNameField(true);
                            setrelationType(selectedRelation);
                          }
                        }}
                        fullWidth
                        variant="outlined"
                      >
                        <MenuItem value="SO">Son of</MenuItem>
                        <MenuItem value="WO">Wife of</MenuItem>
                      </Select>
                    </Grid>
                    {showNameField && (
                      <Grid item xs={6}>
                        <TextField
                          label={
                            relationType === "SO"
                              ? "Father's Name"
                              : "Husband's Name"
                          }
                          variant="outlined"
                          fullWidth
                          value={newPatientDetails.relation || ""}
                          onChange={(e) =>
                            setNewPatientDetails({
                              ...newPatientDetails,
                              relation: e.target.value,
                            })
                          }
                        ></TextField>
                      </Grid>
                    )}
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
                        onClick={handleCloseNewPatientDialog}
                        color="inherit"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleNewPatientSubmit}
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
                <StickyHeadTable rows={searchResults} category={"patients"} />
              ) : (
                <StickyHeadTable rows={patients} category={"patients"} />
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
