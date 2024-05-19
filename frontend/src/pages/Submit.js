import React, { useState } from "react";
import "./Submit.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";

export default function Submit() {
  const [competition, setCompetition] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [artworkName, setArtworkName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

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

  const handleNameChange = (event) => {
    setArtworkName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("models", "genai");
    formData.append("api_user", "794355209");
    formData.append("api_secret", process.env.REACT_APP_SIGHTENGINE_API_SECRET);

    axios
      .post("https://api.sightengine.com/1.0/check.json", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        // on success: handle response
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
      });
  };

  return (
    <div className="submit">
      <div className="submit_box">
        <h1>Apply to Win Prizes and Opportunities!</h1>
        <TextField
          id="outlined-basic"
          label="Your name"
          variant="outlined"
          className="input"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
        />

        <TextField
          id="outlined-basic"
          label="Name of your artwork"
          variant="outlined"
          className="input"
          fullWidth
          value={artworkName}
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          className="input"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl fullWidth className="input">
          <InputLabel id="competition-label">Competition</InputLabel>
          <Select
            labelId="competition-label"
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
          label="Upload your artwork"
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
        <button className="submit_button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
