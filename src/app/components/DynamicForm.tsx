"use client";
import { useState } from "react";
import { useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import formData from "../../../public/formData.json";

const DynamicForm = () => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [currentFormData, setCurrentFormData] = useState(formData);

  const setCurrentForm = (index: any) => {
    setCurrentFormIndex(index);
  };
  const currentForm = currentFormData[currentFormIndex];


  const validationSchema = Yup.object().shape({
    // Define your validation schema based on the form configuration
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(20, "First Name cannot exceed 20 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(20, "Last Name cannot exceed 20 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <Stack>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentFormData.map((_, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => setCurrentForm(index)}
            color="success"
            sx={{ marginRight: "2px" }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        {currentForm?.map(
          ({ type, label, name, required, validation, options, css }) => {
            let obj: any = {
              name: "",
              value: "",
            };
            css.forEach(function (el: any) {
              let key = el.name;
              obj[key as keyof any] = el.value;
            });
            return (
              <div key={label}>
                {type == "text" || type == "email" ? (
                  <TextField
                    id="outlined-basic"
                    {...formik.getFieldProps(name)}
                    label={label}
                    required={true}
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type == "textarea" ? (
                  <TextField
                    id="standard-multiline-static"
                    {...formik.getFieldProps(name)}
                    required={true}
                    label={label}
                    multiline
                    maxRows={4}
                    defaultValue=""
                    variant="standard"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type == "password" ? (
                  <TextField
                    id="outlined-password-input"
                    {...formik.getFieldProps(name)}
                    label={label}
                    required={true}
                    type="password"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type == "date" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DemoItem label={label}>
                        <DatePicker defaultValue={dayjs("2022-04-17")} />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                ) : type == "tel" ? (
                  <TextField
                    id="outlined-basic"
                    {...formik.getFieldProps(name)}
                    label={label}
                    required={true}
                    variant="outlined"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type == "number" ? (
                  <TextField
                    id="outlined-basic"
                    {...formik.getFieldProps(name)}
                    required={true}
                    label={label}
                    variant="standard"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type === "file" ? (
                  <TextField
                    id="outlined-basic"
                    {...formik.getFieldProps(name)}
                    //   label={label}
                    type="file"
                    required={true}
                    variant="outlined"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : type == "select" ? (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      {label}
                    </InputLabel>
                    <Select
                      id="demo-simple-select"
                      label={label}
                      {...formik.getFieldProps(name)}
                      required={true}
                      sx={{
                        ...obj,
                      }}
                    >
                      {options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : type == "radio" ? (
                  <>
                    <InputLabel>{label}</InputLabel>
                    <RadioGroup
                      row
                      aria-label={label}
                      name={name}
                      value={selectedOption}
                      onChange={handleOptionChange}
                      sx={{
                        ...obj,
                      }}
                    >
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                          sx={{
                            ...obj,
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </>
                ) : type == "checkbox" ? (
                  <FormControlLabel
                    control={<Checkbox required={required} />}
                    label={label}
                    name={name}
                    sx={{
                      ...obj,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          }
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default DynamicForm;
