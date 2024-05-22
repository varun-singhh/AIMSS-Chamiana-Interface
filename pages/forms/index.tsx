import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import DashboardCard from "../../src/components/shared/DashboardCard";
import PageContainer from "../../src/components/container/PageContainer";
import FullLayout from "../../src/layouts/full/FullLayout";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getAllForm } from "../../actions/forms";
import { getDateFromString } from "../../utils/utils";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import FormListView from "./single";

interface Column {
  id:
    | "id"
    | "type"
    | "category"
    | "consulting_doctor_name"
    | "filler_type"
    | "created_at"
    | "registry_number";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const formColumns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "type", label: "Type", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "right",
  },
  {
    id: "consulting_doctor_name",
    label: "Consulting Doctor",
    minWidth: 170,
    align: "right",
  },
  {
    id: "filler_type",
    label: "Form Filled By",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "created_at",
    label: "Date of Registry",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "registry_number",
    label: "Registry Number",
    minWidth: 170,
    align: "right",
  },
];

const AllFormsTable = () => {
  const dispatch: AppDispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const formState = useSelector((state: RootState) => state?.form?.data);
  const [selectedRow, setSelectedRow] = useState<any>(null); // State to hold the clicked row data

  const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData); // Update state with the clicked row data
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllForm());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRows(formState?.data?.data ?? []);
      setLoading(false);
    }, 3000);
  }, [loading]);

  const handlePrint = (func: () => void) => {
    func();
  };
  return (
    <>
      {selectedRow && (
        <>
          <Card
            elevation={0}
            sx={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
              border: "1px solid #DAE0E2",
              color: "#777E8B",
            }}
            onClick={() => {
              setSelectedRow(null);
            }}
          >
            <ArrowBackIos />
            Back
          </Card>
          <FormListView data={selectedRow} handlePrintForm={handlePrint} />
        </>
      )}

      {selectedRow === null && (
        <PageContainer title="All Forms" description="This is forms page">
          <DashboardCard title="All Forms">
            {loading ? (
              <CircularProgress
                style={{ margin: "10px auto", display: "block" }}
              />
            ) : (
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  marginTop: "2rem",
                  padding: "1rem",
                }}
                elevation={0}
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
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {formColumns.map((column) => (
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
                            ?.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row?.id}
                                  onClick={() => handleRowClick(row)}
                                >
                                  {formColumns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <>
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
                                        {column.id === "created_at" && (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                          >
                                            {getDateFromString(value)}
                                          </TableCell>
                                        )}
                                        {(column.id === "type" ||
                                          column.id === "category" ||
                                          column.id ===
                                            "consulting_doctor_name" ||
                                          column.id === "filler_type") && (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                          >
                                            {value}
                                          </TableCell>
                                        )}

                                        {column.id === "registry_number" && (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                          >
                                            {row["data"][
                                              "patient_identification"
                                            ]?.["registry_number"] ?? "NA"}
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
            )}
          </DashboardCard>
        </PageContainer>
      )}
    </>
  );
};

export default AllFormsTable;

AllFormsTable.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
