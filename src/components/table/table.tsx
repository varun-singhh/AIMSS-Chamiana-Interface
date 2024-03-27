import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Card, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

interface Column {
  id:
    | "id"
    | "name"
    | "email"
    | "phone"
    | "department"
    | "designation"
    | "aadhar_number";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const doctorColumns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "department",
    label: "Deptartment",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "designation",
    label: "Designation",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

const patientColumns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "aadhar_number",
    label: "Aadhar number",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

export default function StickyHeadTable({ rows, category }: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        marginTop: "2rem",
        padding: "1rem",
      }}
      elevation={9}
      variant={undefined}
    >
      {rows?.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            height: "15rem",
            backgroundImage: `url(/images/backgrounds/no-records.webp)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      ) : (
        <>
          {" "}
          <Typography py={2} fontSize={14}>
            List of all {category}
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {category === "doctors"
                    ? doctorColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "#ececec",
                            boxShadow: "initial",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))
                    : patientColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "#ececec",
                            boxShadow: "initial",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row?.id}
                      >
                        {category === "doctors"
                          ? doctorColumns.map((column) => {
                              const value = row[column.id];

                              return (
                                <>
                                  {column.id === "name" && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {row["doctor_details"][column.id]}
                                    </TableCell>
                                  )}
                                  {(column.id === "email" ||
                                    column.id === "phone") && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {row["doctor_contact"][column.id]}
                                    </TableCell>
                                  )}
                                  {(column.id === "department" ||
                                    column.id === "designation") && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {value}
                                    </TableCell>
                                  )}
                                  {column.id === "id" && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      sx={{
                                        color: "#5D87FF",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {value}
                                    </TableCell>
                                  )}
                                </>
                              );
                            })
                          : patientColumns.map((column) => {
                              const value = row[column.id];

                              return (
                                <>
                                  {column.id === "name" && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {row["patient_details"][column.id]}
                                    </TableCell>
                                  )}
                                  {column.id === "aadhar_number" && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {row["patient_details"][column.id]}
                                    </TableCell>
                                  )}
                                  {(column.id === "email" ||
                                    column.id === "phone") && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {row["patient_contact"][column.id]}
                                    </TableCell>
                                  )}
                                  {column.id === "id" && (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      sx={{
                                        color: "#5D87FF",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {value}
                                    </TableCell>
                                  )}
                                </>
                              );
                            })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
