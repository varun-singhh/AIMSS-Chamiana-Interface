import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  withStyles,
  Button,
  Card,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";

interface FormListViewProps {
  data: any;
}

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  cell: {
    border: "1px solid #dddddd",
    padding: "8px",
  },
  headerCell: {
    border: "1px solid #dddddd",
    padding: "8px",
    fontWeight: "bold",
  },
};

const FormListView: React.FC<FormListViewProps> = ({ data }) => {
  const [selectedFormData, setSelectedFormData] = useState<any | null>(data);
  const componentRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data?.data?.patient_identification?.name}_${data?.type}_${data?.category}_form`,
  });

  const renderKeyValuePairs = (obj: any) => {
    return Object.keys(obj).map((key) => {
      const formattedKey = key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <TableRow key={key}>
            <TableCell colSpan={2} style={styles.cell}>
              <Typography variant="h6" gutterBottom>
                {formattedKey}
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small" style={styles.table}>
                  <TableBody sx={{ marginTop: "10px" }}>
                    {renderKeyValuePairs(obj[key])}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
        );
      } else {
        return (
          <TableRow key={key}>
            <TableCell style={styles.cell}>{formattedKey}</TableCell>
            <TableCell style={styles.cell}>
              {obj[key] === null ? "null" : obj[key].toString()}
            </TableCell>
          </TableRow>
        );
      }
    });
  };

  console.log(data);

  return (
    <div>
      {selectedFormData && (
        <div>
          <div ref={componentRef}>
            <Card
              elevation={0}
              sx={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "end",
                padding: "10px",
              }}
            >
              <Button onClick={handlePrint} variant="contained" color="primary">
                Print
              </Button>
            </Card>

            <TableContainer component={Paper} elevation={0}>
              <Table size="small" style={styles.table}>
                <TableBody>{renderKeyValuePairs(selectedFormData)}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormListView;
