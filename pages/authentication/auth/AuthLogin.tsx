import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  MenuItem,
  Select,
  Switch,CircularProgress
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { login } from "../../../actions/auth";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import { Navigate } from "react-router-dom";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [useEmail, setUseEmail] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [loggedInStatus, setloggedInStatus] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "phone") {
      // Check if value is number and not greater than 10 digits
      if (!isNaN(Number(value)) && value.length <= 10) {
        setPhone(value);
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "permission") {
      setPermission(value);
    }
  };

  const handleToggleChange = () => {
    setUseEmail(!useEmail);
  };

  const handleLoading = (val: boolean) =>{
    setLoading(val)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    setloggedInStatus(false);
    event.preventDefault();
    if (useEmail) {
      dispatch(
        login({
          email,
          password,
          permission,
        },handleLoading)
      );
    } else {
      dispatch(
        login({
          phone,
          password,
          permission,
        },handleLoading)
      );
    }
  };

    useEffect(() => {
    if (state.auth.loggedIn) {
      setTimeout(() => {
        window.location.href = "/";
      }, 500); // Redirect after a short delay for better user experience
    }
  }, [state.auth.loggedIn]);

  // Display success or error popup based on state
  if (state.auth.loggedIn) {
    setTimeout(() => {
      setloggedInStatus(true);
    }, 500); // Delay the popup to show after a short time (for better user experience)
  } else if (state.auth?.data?.errors?.length > 0) {
    setTimeout(() => {
      setloggedInStatus(true);
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit}>
      <>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Stack spacing={2}>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              {useEmail ? "Email" : "Phone"}
            </Typography>
            {useEmail ? (
              <CustomTextField
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleInputChange}
              />
            ) : (
              <CustomTextField
                type="tel" // Change to 'tel' type
                name="phone"
                variant="outlined"
                fullWidth
                value={phone} // Use 'phone' state for value
                onChange={handleInputChange}
                error={phoneError} // Use 'phoneError' for error state
                helperText={phoneError ? "Invalid phone number" : ""} // Display phone error message when 'phoneError' is true
              />
            )}
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="permission"
              mb="5px"
            >
              Permission
            </Typography>
            <Select
              value={permission}
              name="permission"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">Select Permission</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="PATIENT">Patient</MenuItem>
              <MenuItem value="DOCTOR">Doctor</MenuItem>
            </Select>
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={useEmail}
                    onChange={handleToggleChange}
                    name="loginType"
                    color="primary"
                  />
                }
                label="Use Email"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        {loggedInStatus && state.auth?.loggedIn && (
        <Typography variant="body1" color="" alignContent={"center"} mt={2} mb={2}>
          Successfully Logged In!
        </Typography>
      )}
      {loggedInStatus && state.auth?.data?.errors?.length > 0 && (
        <Typography variant="body1" color="error" alignContent={"center"} mt={2} mb={2}>
          {state.auth.data?.errors[0]?.reason}
        </Typography>
      )}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {state.auth.loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>
        {subtitle}
      </>
    </form>
  );
};

export default AuthLogin;
