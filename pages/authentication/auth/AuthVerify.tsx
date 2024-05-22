import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import { resendOtp, verify } from "../../../actions/auth";
import { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { clearCookie } from "../../../utils/utils";

export const OtpVerification = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state?.auth);
  const err = useSelector((state: RootState) => state?.error);
  const [otp, setOtp] = useState<string[]>(Array(8).fill(""));
  const [validOtp, setValidOtp] = useState<any>([]);
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [codeExpired, setCodeExpired] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsActive(false);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    if (seconds === 0 || Cookies.get("codeExpired") === "true") {
      setIsActive(false);
      setCodeExpired(true);
    } else {
      setIsActive(true);
    }

    return () => clearInterval(interval);
  }, [seconds, isActive]);

  useEffect(() => {
    Cookies.set("codeExpired", String(codeExpired));
  }, [codeExpired]);

  useEffect(() => {
    if (auth?.data === null) {
      router.push("/authentication/register");
    }
  }, [auth?.data?.user]);

  useEffect(() => {
    setError(err?.data?.errors[0]?.reason);
  }, [err?.data?.errors]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      clearCookie();
      if (isActive) {
        event.preventDefault();
        event.returnValue = "none"; // For Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isActive]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setValidOtp((prevValidOtp: any) => {
        const updatedValidOtp = [...prevValidOtp, value];
        if (updatedValidOtp.length === 8) {
          handleVerifyOtp(updatedValidOtp);
        }
        return updatedValidOtp;
      });
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 7 && value !== "") {
        const nextIndex = index + 1;
        document.getElementById(`otp-${nextIndex}`)?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    setSeconds(120);
    setIsActive(true);
    setOtp(Array(8).fill(""));
    Cookies.set("codeExpired", "false");
    dispatch(resendOtp(JSON.parse(Cookies.get("user") ?? "{}")?.email));
  };

  const handleVerifyOtp = (otpVal: any) => {
    const otpString = otpVal.join("");
    dispatch(
      verify(
        {
          code: otpString,
          permission: auth?.data?.user?.permission,
        },
        JSON.parse(Cookies.get("user") ?? "{}")?.email
      )
    );
  };

  useEffect(() => {
    if (auth?.data === "account verified successfully") {
      setOpen(true);
    }
  }, [auth?.data]);

  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <TextField
        sx={{
          height: "50px",
          width: "40px",
          marginLeft: "2px",
          marginRight: "2px",
        }}
        key={index}
        id={`otp-${index}`}
        variant="outlined"
        size="small"
        type="text"
        inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
        value={digit}
        onChange={(e) => handleInputChange(e, index)}
      />
    ));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        <Typography mb={4}>ONE LAST STEP - VERIFY</Typography>
        {auth?.loading ? (
          <CircularProgress size={34} />
        ) : (
          <div style={{ display: "flex" }}>{renderOtpInputs()}</div>
        )}

        {error && (
          <Typography
            variant="body1"
            color="error"
            alignContent="center"
            mt={2}
            mb={2}
          >
            {error}
          </Typography>
        )}
        <Button onClick={handleResendOtp} disabled={isActive}>
          Resend OTP {isActive && `(${formatTime(seconds)})`}
        </Button>
      </Stack>
      <Modal open={open}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw", // Limit the maximum width of the modal to 90% of the viewport width
            backgroundColor: "white",
            padding: "20px",
            overflowY: "auto", // Add vertical scroll if content exceeds modal height
            maxHeight: "90vh", // Limit the maximum height of the modal to 90% of the viewport height
            textAlign: "left", // Align text to the left for better readability
          }}
        >
          <Stack>
            <Typography variant="h7" gutterBottom>
              Account Created Successfully. Login to proceed
            </Typography>
            <Button
              sx={{
                marginY: "10px",
              }}
              color="primary"
              disableElevation
              variant="outlined"
              aria-label="logout"
              size="small"
              onClick={() => {
                clearCookie();
                router.push("/authentication/login");
              }}
            >
              Login
            </Button>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default OtpVerification;
