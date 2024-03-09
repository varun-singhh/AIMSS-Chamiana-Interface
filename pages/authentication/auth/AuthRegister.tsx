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
import { register } from "../../../actions/auth";
import { useRouter } from "next/router";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state?.auth);
  const errorState = useSelector((state: RootState) => state?.error);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [useEmail, setUseEmail] = useState(true);
  const [phoneError, setPhoneError] = useState(false);

  console.log(authState, errorState);

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
    event.preventDefault();
    if (useEmail) {
      dispatch(
        register({
          email,
          password,
          permission,
        })
      );
    } else {
      dispatch(
        register({
          phone,
          password,
          permission,
        })
      );
    }

    if (errorState?.data?.errors.length === 0) {
      router.push("/authentication/verify");
    }
  };

  //   useEffect(() => {
  //     if (authState?.data !== null) {
  //       localStorage.setItem("token", authState?.data?.token);
  //     }
  //   }, [authState?.loggedIn]);

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
                    name="registerType"
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
        {/* {errorState?.data && errorState?.data?.errors?.length > 0 && (
          <Typography
            variant="body1"
            color="error"
            alignContent={"center"}
            mt={2}
            mb={2}
          >
            {errorState?.data?.errors[0]?.reason}
          </Typography>
        )} */}
        <Box>
          {authState?.loading ? (
            <Button
              color="inherit"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Create Account
            </Button>
          )}
        </Box>
        {subtitle}
      </>
    </form>
  );
};

export default AuthRegister;
