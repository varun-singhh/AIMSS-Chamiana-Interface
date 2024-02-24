import { useState } from "react";
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
} from "@mui/material";

import { styled } from "@mui/material/styles";

import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import FullLayout from "../../src/layouts/full/FullLayout";

interface Patient {
  name: string;
  phoneNumber: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  city: string;
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] =
    useState<boolean>(false);
  const [newPatientDetails, setNewPatientDetails] = useState<Partial<Patient>>(
    {}
  );
  const [showNameField, setShowNameField] = useState<boolean>(false);
  const [relationType, setrelationType] = useState<string>("");

  // Dummy patient data for demonstration
  const patients: Patient[] = [
    {
      name: "John Doe",
      phoneNumber: "1234567890",
      aadharNumber: "",
      dateOfBirth: "",
      gender: "",
      age: 0,
      city: "",
      district: "",
      pincode: 0,
      relation: "",
      state: "",
      email: "",
    },
    {
      name: "Jane Doe",
      phoneNumber: "9876543210",
      aadharNumber: "",
      dateOfBirth: "",
      gender: "",
      age: 0,
      city: "",
      district: "",
      pincode: 0,
      relation: "",
      state: "",
      email: "",
    },
    {
      name: "Alice Smith",
      phoneNumber: "5555555555",
      aadharNumber: "",
      dateOfBirth: "",
      gender: "",
      age: 0,
      city: "",
      district: "",
      pincode: 0,
      relation: "",
      state: "",
      email: "",
    },
    // Add more patient data as needed
  ];

  // Function to handle search by name
  const handleNameSearch = (name: string) => {
    const matchedPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(name.toLowerCase())
    );
    setSearchResults(matchedPatients);
  };

  // Function to handle search by phone number
  const handlePhoneSearch = (phone: string) => {
    const matchedPatient = patients.find(
      (patient) => patient.phoneNumber === phone
    );
    setSearchResults(matchedPatient ? [matchedPatient] : []);
  };

  // Function to handle search
  const handleSearch = () => {
    if (!selectedPatient) {
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
    // Implement logic to handle submission of new patient form
    // Here you can save newPatientDetails to your database or perform other actions
    console.log("New patient details:", newPatientDetails);
    // Close the dialog after submission
    setIsNewPatientDialogOpen(false);
    // Clear newPatientDetails state
    setNewPatientDetails({});
  };

  return (
    <PageContainer title="Patient" description="This is Patients page">
      <DashboardCard title="Patient | Find Details & Create New Entry">
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                )}
                onInputChange={(event, newValue) => {
                  setSearchQuery(newValue);
                  setNameSuggestions(
                    patients
                      .map((patient) => patient.name)
                      .filter((name) =>
                        name.toLowerCase().includes(newValue.toLowerCase())
                      )
                  );
                }}
                inputValue={searchQuery}
                onChange={(event, newValue) => {
                  if (newValue) {
                    const foundPatient = patients.find(
                      (patient) => patient.name === newValue
                    );
                    setSelectedPatient(foundPatient || null);
                  } else {
                    setSelectedPatient(null);
                  }
                  setSearchQuery(newValue || "");
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={selectedPatient ? selectedPatient.phoneNumber : ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                disabled={!!selectedPatient}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={handleSearch}>
                Get Patient Details
              </Button>
              <Button variant="contained" onClick={resetSearch}>
                Reset Details
              </Button>
            </Grid>
          </Grid>

          <div>
            {searchResults.map((patient, index) => (
              <div key={index}>
                <Typography>Name: {patient.name}</Typography>
                <Typography>Mobile: {patient.phoneNumber}</Typography>
              </div>
            ))}
          </div>

          {/* Tile for creating a new patient */}
          <FloatingButtonContainer>
            <Button variant="contained" onClick={handleOpenNewPatientDialog}>
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
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={newPatientDetails.city || ""}
                    onChange={(e) =>
                      setNewPatientDetails({
                        ...newPatientDetails,
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
                          relation: `${relationType} ${e.target.value.trim()}`,
                        })
                      }
                    ></TextField>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseNewPatientDialog} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={handleNewPatientSubmit}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

SamplePage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
