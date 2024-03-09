import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { verify } from "../../../actions/auth";
import { useRouter } from "next/router";
import { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

const OtpVerification: React.FC = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const [otp, setOtp] = useState<string[]>(Array(8).fill(""));
  const [validOtp, setValidOtp] = useState<any>([]);
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);

  console.log(state);

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

    if (seconds === 0) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }

    return () => clearInterval(interval);
  }, [seconds, isActive]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isActive) {
        event.preventDefault;
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
      setValidOtp((prevValidOtp: any) => [...prevValidOtp, value]);
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 7 && value !== "") {
        const nextIndex = index + 1;
        document.getElementById(`otp-${nextIndex}`)?.focus();
      }
    }

    if (validOtp.length === 7) {
      handleVerifyOtp();
    }
  };

  const handleResendOtp = () => {
    setSeconds(120);
    setIsActive(true);
    setOtp(Array(8).fill(""));
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    dispatch(
      verify(
        {
          code: otpString,
          permission: "DOCTOR",
        },
        state?.auth?.data?.user?.email
      )
    );
  };

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
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={5}
    >
      <Typography mb={4}>ONE LAST STEP - VERIFY</Typography>
      <div style={{ display: "flex" }}>{renderOtpInputs()}</div>
      <Button onClick={handleResendOtp} disabled={isActive}>
        Resend OTP {isActive && `(${formatTime(seconds)})`}
      </Button>
    </Stack>
  );
};

export default OtpVerification;
