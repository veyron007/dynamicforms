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
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
// import control from "@mui/material";
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

export default function FormConfig() {
  //   const form = useForm();
  //   const { register, control } = form;

  const [formData] = useState([
    [
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "text",
        label: "Last Name",
        name: "lastName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        required: true,
        options: [],
      },
      {
        type: "password",
        label: "Password",
        name: "password",
        required: true,
        validation: { maxLength: 20, minLength: 6 },
        options: [],
      },
    ],
    [
      {
        type: "text",
        label: "Full Name",
        name: "fullName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "select",
        label: "Favorite color",
        name: "favoriteColor",
        options: [
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ],
        required: true,
      },
      {
        type: "radio",
        label: "Gender",
        name: "gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
        required: true,
      },
      {
        type: "checkbox",
        label: "I agree to the terms and conditions",
        name: "terms",
        required: true,
        options: [],
      },
    ],
    [
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "text",
        label: "Last Name",
        name: "lastName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "tel",
        label: "Phone Number",
        name: "phoneNumber",
        required: true,
        options: [],
      },
      {
        type: "text",
        label: "Address",
        name: "address",
        required: true,
        options: [],
      },
    ],
    [
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "text",
        label: "Last Name",
        name: "lastName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        required: true,
        options: [],
      },
      {
        type: "password",
        label: "Password",
        name: "password",
        required: true,
        validation: { maxLength: 20, minLength: 6 },
        options: [],
      },
      {
        type: "password",
        label: "Confirm Password",
        name: "confirmPassword",
        required: true,
        validation: { maxLength: 20, minLength: 6 },
        options: [],
      },
    ],
    [
      {
        type: "text",
        label: "Username",
        name: "username",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        required: true,
        options: [],
      },
      {
        type: "password",
        label: "Password",
        name: "password",
        required: true,
        validation: { maxLength: 20, minLength: 6 },
        options: [],
      },
      {
        type: "password",
        label: "Confirm Password",
        name: "confirmPassword",
        required: true,
        validation: { maxLength: 20, minLength: 6 },
        options: [],
      },
    ],
    [
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
      {
        type: "text",
        label: "Last Name",
        name: "lastName",
        required: true,
        validation: { maxLength: 20, minLength: 3 },
        options: [],
      },
    ],
  ]);

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

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

  useEffect(() => {
    setCurrentForm(formData[currentIndex]);
  }, [currentIndex]);

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
        {Array(6)
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
      <Box
        component="form"
        onSubmit={SubmitHandler}
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
          ({ type, label, name, required, validation, options }) => {
            return (
              <>
                {type == "text" || type == "email" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    label={label}
                    required={required}
                    variant="outlined"
                  />
                ) : type == "password" ? (
                  <TextField
                    id="outlined-password-input"
                    label={label}
                    name={name}
                    required={required}
                    type="password"
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
                      required={required}
                      value={color}
                      onChange={handleChange}
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
                    >
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </>
                ) : type == "checkbox" ? (
                  <FormControlLabel
                    control={<Checkbox required={required} />}
                    label={label}
                    name={name}
                  />
                ) : (
                  ""
                )}
              </>
            );
          }
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {/* <DevTool control={control} /> */}
      </Box>
    </Stack>
  );
}
