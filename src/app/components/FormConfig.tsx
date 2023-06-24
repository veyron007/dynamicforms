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

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MuiTelInput } from 'mui-tel-input'
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
// import control from "@mui/material";
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import formData from "../../../public/formData.json";

export default function FormConfig() {
  const form = useForm();
  const { register, control } = form;
 

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
          ({ type, label, name, required, validation, options, css  }) => {
          
            // interface csstype {
            //   name: string;
            //   value: string;
            // }
            let obj: any = {
                name:'',
                value:''
            }
            css.forEach(function(el:any){
              let key = el.name
              obj[key as keyof any]= el.value
          })
            return (
              <div key={label}>
                {type == "text" || type == "email" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    label={label}
                    required={required}
                    variant="outlined"
                    sx={{...obj}}
                  />
                ) : type == "textarea" ? (
                  <TextField
                    id="standard-multiline-static"
                    name={name}
                    required={required}
                    label={label}
                    multiline
                    maxRows={4}
                    defaultValue=""
                    variant="standard"
                    sx={{...obj}}
                  />
                ) : type == "password" ? (
                  <TextField
                    id="outlined-password-input"
                    label={label}
                    name={name}
                    required={required}
                    type="password"
                    sx={{...obj}}
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
                    name={name}
                    label={label}
                    required={required}
                    variant="outlined"
                    sx={{...obj}}
                  />
                ) : type == "number" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    required={required}
                    label={label}
                    variant="standard"
                    sx={{...obj}}
                  />
                ) : type == "file" ? (
                  <TextField
                    id="outlined-basic"
                    name={name}
                    //   label={label}
                    type="file"
                    required={required}
                    variant="outlined"
                    sx={{...obj}}
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
                      sx={{...obj}}
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
                      sx={{...obj}}
                    >
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                          sx={{...obj}}
                        />
                      ))}
                    </RadioGroup>
                  </>
                ) : type == "checkbox" ? (
                  <FormControlLabel
                    control={<Checkbox required={required} />}
                    label={label}
                    name={name}
                    sx={{...obj}}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          }
        )}
        <Button type="submit" variant="contained" color="primary" >
          SUBMIT
        </Button>
        {/* <DevTool control={control} /> */}
      </Box>
    </Stack>
  );
}
