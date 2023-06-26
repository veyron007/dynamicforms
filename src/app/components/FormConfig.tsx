"use client";
// for now see this code as the base of dynamic forms. Suggest me changes and also prepare a general schema for me for next operation
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

import {Form, Field, ErrorMessage, Formik, useFormik } from 'formik';

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import formData from "../../../public/formData.json";

import * as Yup from "yup";

export default function FormConfig() {
  const form = useForm();
  const { register, control } = form;

  const validationSchema = Yup.object().shape({
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
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  // const SubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  // };
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values : any) => {
      console.log(values);
    },
  });
  
  
 // const { getFieldProps, errors } = formik;
 // const SubmitHandler = formik.handleSubmit;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentForm, setCurrentForm] = useState(formData[currentIndex]);

  const [color, setColor] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  };

  const SubmitHandler = () => {
    const handleSubmit = (values :any, { setSubmitting = Boolean }) => {
      // Perform any asynchronous operations, such as API calls, here
    
      // Simulating an API call with a setTimeout
      setTimeout(() => {
        // Once the operation is complete, you can access the form values
        console.log(values);
    
        // Reset any form submission states
        setSubmitting(false);
    
        // Optionally, perform any other actions after form submission
        // For example, redirecting to a different page
        // history.push('/success'); // Assuming you have access to the 'history' object
      }, 1000); // Simulating a delay of 1 second (adjust as needed)
    };
    
  };
  
  useEffect(() => {
    setCurrentForm(formData[currentIndex]);
  }, [currentIndex]);

  return (
   <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array(formData.length)
          .fill(0)
          .map((el, index) => {
            return (
              <Button
                key={index}
                variant="contained"
                onClick={() => {
                  setCurrentIndex(index);
                }}
                color="success"
                sx={{ marginRight: "2px" }}
              >
                {index + 1}
              </Button>
            );
          })}
      </Box>
    
     <Form  onSubmit={SubmitHandler}
        style={{
         
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
       >
      {/* Rest of your form components */}
    
      {/* <Box
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
      > */}

       {/* let obj: any = {
              name: "",
              value: "",
            };
            css.forEach(function (el: any) {
              let key = el.name;
              obj[key as keyof any] = el.value;
            }); */}

        {currentForm?.map(
          ({ type, label, name, required, validation, options }) => {
           
            return (
              <div key={label}>
                {type == "text" || type == "email" ? (
                  <>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label={label}
                      name={name}
                      variant="outlined"
                      // value={formik.values[name]}
                      // onChange={formik.handleChange}
                      // error={formik.touched[name] && Boolean(formik.errors[name])}
                      // helperText={formik.touched[name] && formik.errors[name]}
                      // sx={{ ...obj }}
                    />
                    <ErrorMessage name="name" />
                  </>
                ) : type == "textarea" ? (
                  <>
                  <TextField
                    id="standard-multiline-static"
                    name={name}
                    required={true}
                    label={label}
                    multiline
                    maxRows={4}
                    defaultValue=""
                    variant="standard"
                    // sx={{ ...obj }}
                  />
                  </>
                ) : type == "password" ? (
                  <>
                  <TextField
                    id="outlined-password-input"
                    label={label}
                    name={name}
                    required={true}
                    type="password"
                    // sx={{ ...obj }}
                  />
                  </>
                ) : type == "date" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DemoItem label={label}>
                        <DatePicker defaultValue={dayjs("2022-04-17")} />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                ) : type == "tel" ? (
                  <>
                  <TextField
                    id="outlined-basic"
                    name={name}
                    label={label}
                    required={true}
                    variant="outlined"
                    // sx={{ ...obj }}
                  />
                  </>
                ) : type == "number" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    required={true}
                    label={label}
                    variant="standard"
                    // sx={{ ...obj }}
                  />
                ) : type == "file" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    //   label={label}
                    type="file"
                    required={true}
                    variant="outlined"
                    // sx={{ ...obj }}
                  />
                ) : type == "select" ? (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      {label}
                    </InputLabel>
                    <Select
                      id="demo-simple-select"
                      label={label}
                      name={name}
                      required={true}
                      value={color}
                      onChange={handleChange}
                      // sx={{ ...obj }}
                    >
                      {options?.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
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
                      // sx={{ ...obj }}
                    >
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                          // sx={{ ...obj }}
                        />
                      ))}
                    </RadioGroup>
                  </>
                ) : type == "checkbox" ? (
                  <>
                  <FormControlLabel
                    control={<Checkbox required={true} />}
                    label={label}
                    name={name}
                    // sx={{ ...obj }}
                  />
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          }
        )}
        <Button type="submit" variant="contained" color="primary">
          SUBMIT
        </Button>
     
      </Form>
      
    </>
   
  );
}
