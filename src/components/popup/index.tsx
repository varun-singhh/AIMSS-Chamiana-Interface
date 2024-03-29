import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getAllPatientsDetails } from "../../../actions/patients";
import { getAllDoctorsDetails } from "../../../actions/doctors";

const Popup = ({
  title,
  desc,
  open,
  onClose,
  onOkay,
  closeButtonTitle,
  okayButtonTitle,
}: any) => {
  const userState = useSelector((state: RootState) => state?.user?.data?.data);
  const [dialogOpen, setDialogOpen] = useState(open);

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{desc}</p>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            {closeButtonTitle && (
              <Button variant="outlined" onClick={onClose}>
                {closeButtonTitle}
              </Button>
            )}
          </Grid>
          <Grid item>
            {okayButtonTitle && (
              <Button variant="contained" onClick={onOkay}>
                {okayButtonTitle}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
