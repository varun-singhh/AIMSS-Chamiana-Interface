import { Button, Stack, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { clearCookie } from "../../../utils/auth";
import { useRouter } from "next/router";

const registered = ({ open, handleOpen }: any) => {
  const [count, setCount] = useState(0);
  const [isopen, setOpen] = useState(open ?? false);
  const router = useRouter();

  useEffect(() => {
    if (count > 0) {
      setOpen(false);
    }
  }, [count]);

  return (
    <Modal open={count === 0 ? isopen : false}>
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
              handleOpen(false);
              setOpen(false);
              clearCookie();
              router.push("/authentication/login");
              setCount(count + 1);
            }}
          >
            Login
          </Button>
        </Stack>
      </div>
    </Modal>
  );
};

export default registered;
