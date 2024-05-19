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
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";

const Submit = withAuthInfo((props) => {
  const [competition, setCompetition] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [artworkName, setArtworkName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = (newFile) => {
    setFile(newFile);
    if (newFile) {
      const imageUrl = URL.createObjectURL(newFile);
      console.log("imageUrl", imageUrl)
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

  const handleSubmit = async () => {
    console.log(competition)
    const fileString = JSON.stringify(file);
    console.log("file", file)
    console.log("fileString", fileString)
    console.log(typeof image)
    const formData = {
      "name": username,
      posts: {set: [
        {
          "artwork": artworkName,
          "description": description,
          "competition": competition,
          "image": image
        },
      ]},
    };

    let userID = "";
    let userImage = ""
    const fetchData = async () => {
      try {
        // Make the GET request
        const filter = JSON.stringify({ email: props.user.email });
        const response = await fetch(
          `https://us-east-2.aws.neurelo.com/rest/users?filter=${encodeURIComponent(
            filter
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
            },
          }
        );
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        // Parse the JSON from the response
        const result = await response.json();
        // Set the fetched data to the state
        console.log(result);
        console.log(result.data[0].posts[0].image)
        setUserImage(result.data[0].posts[0].image)
        userImage = result.data[0].posts[0].image
        userID = result.data[0].id;
      } catch (error) {
        // Set the error to the state
        console.log(error.message);
      }
    };
    await fetchData();
    const patchData = async () => {
      try {
        // Make the GET request
        const response = await fetch(
          `https://us-east-2.aws.neurelo.com/rest/users/${userID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
            },
            body: JSON.stringify(formData),
          }
        );
        // Check if the response is ok (status code 200-299)
        // if (!response.ok) {
        //   console.log(response);
        //   throw new Error("Network response was not ok");
        // }
        // Parse the JSON from the response
        const result = await response.json();
        // Set the fetched data to the state
        console.log(result);
      } catch (error) {
        // Set the error to the state
        console.log(error.message);
      }
    };
    await patchData();
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
            <MenuItem value={"Neurelo Hackathon Submission"}>
              Neurelo Hackathon Submission
            </MenuItem>
            <MenuItem value={"PreAuth"}>PreAuth</MenuItem>
            <MenuItem value={"MLH"}>MLH</MenuItem>
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
      {userImage && (
        <img src={userImage} alt="Art" className="post__art-image" />
      )}
    </div>
  );
});

export default Submit;
