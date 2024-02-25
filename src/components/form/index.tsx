import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  Radio,
} from "@mui/material";

interface FormData {
  title: string;
  children: {
    field: string;
    type: string;
    isTrue?: FormData["children"];
    isFalse?: FormData["children"];
    menuItem?: string[];
    options?: string[];
    element?: React.ReactNode;
  }[];
}

type FormDataUpdateCallback = (formData: any) => void;

const DynamicForm: React.FC<{ formData: FormData[], onFormDataUpdate: FormDataUpdateCallback }> = ({ formData, onFormDataUpdate }) => {
  // State to store values entered by the user for each field
  const [formValues, setFormValues] = useState<{ [fieldName: string]: any }>(
    {}
  );

  // Function to handle changes in form field values
  const handleFieldValueChange = (fieldName: string, value: any) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const convertFieldName = (fieldName: string) => {
    return fieldName.toLowerCase().replace(/\s+/g, "_");
  };

  useEffect(() => {
    const loggingInterval = setInterval(() => {
      const formDataObject: { [title: string]: { [field: string]: any } } = {};
      formData.forEach(({ title, children }) => {
        const fieldValues: { [field: string]: any } = {};
        children.forEach(({ field, type, isTrue, menuItem }) => {
          const formattedField = convertFieldName(field); // Convert field name
          if (type === "boolean") {
            fieldValues[formattedField] = formValues[field] || false;
            if (formValues[field] && isTrue) {
              isTrue.forEach(({ field: trueField }) => {
                fieldValues[convertFieldName(trueField)] =
                  formValues[trueField] || null;
              });
            }
          } else if (type === "menu" && formValues[field]) {
            fieldValues[formattedField] = formValues[field];
          } else {
            fieldValues[formattedField] = formValues[field] || null;
          }
        });
        formDataObject[convertFieldName(title)] = fieldValues; // Convert title
      });
      onFormDataUpdate(formDataObject)
    }, 4500);

    // Clear the interval on component unmount
    return () => clearInterval(loggingInterval);
  }, [formValues]);

  const renderField = (fieldData: FormData["children"][number]) => {
    switch (fieldData.type) {
      case "string":
        return (
          <TextField
            sx={{ width: "100%", margin: "10px 0px" }}
            label={fieldData.field}
            value={formValues[fieldData.field] || ""}
            onChange={(e) =>
              handleFieldValueChange(fieldData.field, e.target.value)
            }
          />
        );
      case "number":
        return (
          <TextField
            sx={{ width: "100%", margin: "10px 0px" }}
            type="number"
            label={fieldData.field}
            value={formValues[fieldData.field] || ""}
            onChange={(e) =>
              handleFieldValueChange(fieldData.field, e.target.value)
            }
          />
        );
      case "boolean":
        return (
          <Grid
            container
            spacing={1}
            sx={{ width: "100%", margin: "10px 4px" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="body1" sx={{ margin: "10px 10px 0px 0px" }}>
                {fieldData.field}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RadioGroup
                row
                value={formValues[fieldData.field] ? "yes" : "no"}
                onChange={(e) =>
                  handleFieldValueChange(
                    fieldData.field,
                    e.target.value === "yes" ? true : false
                  )
                }
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            {formValues[fieldData.field]
  ? fieldData.isTrue &&
    fieldData.isTrue.map((subField, index) => (
      <Grid item xs={12} key={`${fieldData.field}-true-${index}`}>
        {renderField(subField)}
      </Grid>
    ))
  : fieldData.isFalse &&
    fieldData.isFalse.map((subField, index) => (
      <Grid item xs={12} key={`${fieldData.field}-false-${index}`}>
        {renderField(subField)}
      </Grid>
    ))}

          </Grid>
        );

      case "multiple":
        return (
          <FormGroup sx={{ width: "100%", margin: "10px 0px" }}>
            <Typography>{fieldData.field}</Typography>
            <Grid container spacing={1}>
              {fieldData.options?.map((option) => (
                <Grid item key={option}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          formValues[fieldData.field]?.includes(option) || false
                        }
                        onChange={(e) => {
                          const selectedOptions =
                            formValues[fieldData.field] || [];
                          const updatedOptions = e.target.checked
                            ? [...selectedOptions, option]
                            : selectedOptions.filter(
                                (item: string) => item !== option
                              );
                          handleFieldValueChange(
                            fieldData.field,
                            updatedOptions
                          );
                        }}
                      />
                    }
                    label={option}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        );
      case "date":
        return (
          <TextField
            sx={{ width: "100%", margin: "10px 0px" }}
            type="date"
            label={fieldData.field}
            value={formValues[fieldData.field] || ""}
            onChange={(e) =>
              handleFieldValueChange(fieldData.field, e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        );
      case "time":
        return (
          <TextField
            sx={{ width: "100%", margin: "10px 0px" }}
            type="time"
            label={fieldData.field}
            value={formValues[fieldData.field] || ""}
            onChange={(e) =>
              handleFieldValueChange(fieldData.field, e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        );
      case "menu":
        return (
          <Select
            sx={{ width: "100%", margin: "10px 0px" }}
            label={fieldData.field}
            value={formValues[fieldData.field] || ""}
            onChange={(e) =>
              handleFieldValueChange(fieldData.field, e.target.value)
            }
            displayEmpty
            renderValue={(selected) => selected || `Select ${fieldData.field}`}
          >
            <MenuItem disabled value="">
              {`Select ${fieldData.field}`}
            </MenuItem>
            {fieldData.menuItem?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        );
      case "element":
        // Render the provided React element
        return fieldData.element;
      default:
        return (
          <Typography variant="body1">
            Unsupported type: {fieldData.type}
          </Typography>
        );
    }
  };

  return (
    <div>
      {formData.map((form, index) => (
        <div key={index}>
          {/* {form.title != "" ? (
            <Typography variant="h5" mt={1}>
              {form.title}
            </Typography>
          ) : (
            <></>
          )} */}
          {form.children.map((field) => (
            <div key={field.field}>{renderField(field)}</div>
          ))}
        </div>
      ))}
      {/* <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ margin: "10px 4px" }}
      >
        Submit
      </Button> */}
    </div>
  );
};

export default DynamicForm;
