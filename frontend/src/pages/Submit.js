import React, { useState } from "react";
import "./Submit.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function Submit() {
  const [competition, setCompetition] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileUpload = (newFile) => {
    setFile(newFile);
    if (newFile) {
      const imageUrl = URL.createObjectURL(newFile);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  };

  const handleChange = (event) => {
    setCompetition(event.target.value);
  };

  return (
    <div className="submit">
      <div className="submit_box">
        <h1>Apply and Win Prizes and Opportunities!</h1>

        <TextField
          id="outlined-basic"
          label="Name of your artwork"
          variant="outlined"
          className="input"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          className="input"
          fullWidth
        />
        <FormControl fullWidth className="input">
          <InputLabel id="demo-simple-select-label">Competition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={competition}
            label="Competition"
            onChange={handleChange}
          >
            <MenuItem value={10}>Neurelo Hackathon Submission</MenuItem>
            <MenuItem value={20}>PreAuth</MenuItem>
            <MenuItem value={30}>MLH</MenuItem>
          </Select>
        </FormControl>
        <MuiFileInput
          className="input"
          fullWidth
          value={file}
          onChange={handleFileUpload}
          InputProps={{
            inputProps: {
              accept: ".png, .jpeg",
            },
            startAdornment: <AttachFileIcon />,
            name: "hello",
          }}
          getInputText={(value) => (value ? "Thanks!" : "")}
        />
        {image && <img src={image} alt="Art" className="post__art-image" />}
      </div>
    </div>
  );
}
