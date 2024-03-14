import React, { useState, useEffect } from "react";
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
  Switch,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { login } from "../../../actions/auth";
import { useRouter } from "next/router";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state?.auth);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [useEmail, setUseEmail] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const handleInputChange = (event: any) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoggedInStatus(false);
    event.preventDefault();
    if (useEmail) {
      dispatch(
        login({
          email,
          password,
          permission,
        })
      );
    } else {
      dispatch(
        login({
          phone,
          password,
          permission,
        })
      );
    }
    console.log(state);
  };

  useEffect(() => {
    if (state?.loggedIn) {
      localStorage.setItem("token", state?.data?.token);
      router.push("/");
    }
  }, [state?.loggedIn]);

  useEffect(() => {
    if (state?.data?.errors?.length > 0) {
      setTimeout(() => {
        setLoggedInStatus(true);
      }, 500);
    }
  }, [state?.data?.errors]);

  return (
    <form onSubmit={handleSubmit}>
      {state && (
        <>
          {title && (
            <Typography fontWeight="700" variant="h2" mb={1}>
              {title}
            </Typography>
          )}

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
          {loggedInStatus && (
            <Typography
              variant="body1"
              color="error"
              alignContent={"center"}
              mt={2}
              mb={2}
            >
              {state?.data?.errors[0]?.reason}
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
              {state?.loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>
          {subtitle}
        </>
      )}
    </form>
  );
};

export default AuthLogin;
