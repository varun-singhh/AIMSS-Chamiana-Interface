import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Radio,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getAllPatientsDetails } from "../../../actions/patients";
import { getAllDoctorsDetails } from "../../../actions/doctors";
import { useRouter } from "next/router";

const SearchDialog = ({ open, onClose }: any) => {
  const router = useRouter();
  const userState = useSelector((state: RootState) => state?.user?.data?.data);
  const dispatch: AppDispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(open);
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientAadhar, setPatientAadhar] = useState<string>("");
  const [doctortName, setDoctortName] = useState<string>("");
  const [doctorPhone, setDoctorPhone] = useState<string>("");
  const [doctorLicenseNumber, setDoctorLicenseNumber] = useState<string>("");
  const [searchPatientResults, setSearchPatientResults] = useState([]);
  const [searchDoctorResults, setSearchDoctorResults] = useState([]);
  const [patientLoading, setPatientLoading] = useState<boolean>(false);
  const [docLoading, setDocLoading] = useState<boolean>(false);
  const [showpatientData, setShowPatientData] = useState(false);
  const [showDoctorData, setShowDoctorData] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handlePatientSearch = () => {
    setShowPatientData(false);
    setPatientLoading(true);
    var querystring = "";

    if (patientAadhar !== "") {
      querystring += `aadhar_number=${patientAadhar}&`;
    }
    if (patientName !== "") {
      querystring += `name=${patientName}`;
    }
    if (patientPhone !== "") {
      querystring += `phone=${patientPhone}&`;
    }

    dispatch(getAllPatientsDetails(querystring));

    // Implement your search logic here
    // For example, fetch data from backend based on searchQuery
    // Once you have search results, update setSearchPatientResults
    // Example: setSearchPatientResults([...]);
    setTimeout(() => {
      setPatientLoading(false);
      setShowPatientData(true);
    }, 1500);
  };

  const handleDoctorSearch = () => {
    setShowDoctorData(false);
    setDocLoading(true);
    var querystring = "";

    if (doctorLicenseNumber !== "") {
      querystring += `license_number=${doctorLicenseNumber}&`;
    }
    if (doctortName !== "") {
      querystring += `name=${doctortName}&`;
    }
    if (doctorPhone !== "") {
      querystring += `phone=${doctorPhone}&`;
    }

    dispatch(getAllDoctorsDetails(querystring));

    // Implement your search logic here
    // For example, fetch data from backend based on searchQuery
    // Once you have search results, update setSearchPatientResults
    // Example: setSearchPatientResults([...]);
    setTimeout(() => {
      setDocLoading(false);
      setShowDoctorData(true);
    }, 1500);
  };

  useEffect(() => {
    setSearchPatientResults(userState ?? []);
  }, [showpatientData]);

  useEffect(() => {
    setSearchDoctorResults(userState ?? []);
  }, [showDoctorData]);

  useEffect(() => {
    if (selectedDoctor !== null && selectedPatient !== null) {
      onClose({ patient: selectedPatient, doctor: selectedDoctor });
      setDialogOpen(false);
    }
  }, [selectedPatient, selectedDoctor]);

  return (
    <Dialog open={dialogOpen} onClose={onClose}>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Patient Search Row */}

          {selectedPatient === null && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Select Patient for which form is being filled
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPatientPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Aadhar Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPatientAadhar(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item>
                    <Button variant="contained" onClick={handlePatientSearch}>
                      Search Patient
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={3}>
                  {patientLoading ? (
                    <CircularProgress
                      style={{ margin: "10px auto", display: "block" }}
                    />
                  ) : (
                    showpatientData && (
                      <TableContainer>
                        <Table>
                          {searchPatientResults.length > 0 && (
                            <TableHead>
                              <TableRow
                                style={{
                                  backgroundColor: "#ececec",
                                  boxShadow: "initial",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Aadhar Number</TableCell>
                              </TableRow>
                            </TableHead>
                          )}
                          <TableBody>
                            {showpatientData &&
                              searchPatientResults?.map((result, index) => (
                                <TableRow key={index} hover role="checkbox">
                                  <TableCell
                                    onClick={() => {
                                      setSelectedPatient(
                                        searchPatientResults[index]
                                      );
                                    }}
                                  >
                                    <Radio
                                      onClick={() => {
                                        setSelectedPatient(
                                          searchPatientResults[index]
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {result?.patient_details?.name}
                                  </TableCell>
                                  <TableCell>
                                    {result?.patient_contact?.phone}
                                  </TableCell>
                                  <TableCell>
                                    {result?.patient_details?.aadhar_number}
                                  </TableCell>
                                </TableRow>
                              ))}
                            {showpatientData &&
                              searchPatientResults.length === 0 && (
                                <Typography my={2}>
                                  Oops!! &nbsp; no records to display
                                </Typography>
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {/* Doctor Search Row */}
          {selectedPatient !== null && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">Select Assigned Doctor</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setDoctortName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setDoctorPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="License Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setDoctorLicenseNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item>
                    <Button variant="contained" onClick={handleDoctorSearch}>
                      Search Doctor
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={3}>
                  {docLoading ? (
                    <CircularProgress
                      style={{ margin: "10px auto", display: "block" }}
                    />
                  ) : (
                    showDoctorData && (
                      <TableContainer>
                        <Table>
                          {searchDoctorResults.length > 0 && (
                            <TableHead>
                              <TableRow
                                hover
                                style={{
                                  backgroundColor: "#ececec",
                                  boxShadow: "initial",
                                }}
                              >
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>License Number</TableCell>
                              </TableRow>
                            </TableHead>
                          )}
                          <TableBody>
                            {showDoctorData &&
                              searchDoctorResults?.map((result, index) => (
                                <TableRow
                                  key={index}
                                  hover
                                  role="checkbox"
                                  onClick={() => {
                                    setSelectedDoctor(
                                      searchDoctorResults[index]
                                    );
                                  }}
                                >
                                  <Radio
                                    onClick={() => {
                                      setSelectedDoctor(
                                        searchDoctorResults[index]
                                      );
                                    }}
                                  />
                                  <TableCell>
                                    {result?.doctor_details?.name}
                                  </TableCell>
                                  <TableCell>
                                    {result?.doctor_contact?.phone}
                                  </TableCell>
                                  <TableCell>
                                    {result?.doctor_details?.license_number}
                                  </TableCell>
                                </TableRow>
                              ))}
                            {showDoctorData &&
                              searchDoctorResults.length === 0 && (
                                <Typography my={2}>
                                  Oops!! &nbsp; no records to display
                                </Typography>
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {/* Search Results Table */}
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            router.push("/case");
          }}
        >
          New Form
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
