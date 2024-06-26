import React, { useState } from "react";
import "./Submit.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";
import { createClient } from "@supabase/supabase-js";

const Submit = withAuthInfo((props) => {
  const navigate = useNavigate();
  const [competition, setCompetition] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [artworkName, setArtworkName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [probability, setProbability] = useState(null);

  const supabaseUrl = "https://nxhutppbcnufqxtmqyyl.supabase.co";
  const supabaseKey = process.env.REACT_APP_SUPABASE;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileUpload = (newFile) => {
    setFile(newFile);
    if (newFile) {
      const imageUrl = URL.createObjectURL(newFile);
      console.log("imageUrl", imageUrl);
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
    console.log(competition);
    const fileString = JSON.stringify(file);
    console.log("file", file);
    console.log("fileString", fileString);
    console.log(typeof image);

    // Sightengine API integration
    if (file) {
      const formData = new FormData();
      formData.append("media", file);
      formData.append("models", "genai");
      formData.append("api_user", "794355209");
      formData.append(
        "api_secret",
        process.env.REACT_APP_SIGHTENGINE_API_SECRET
      );

      try {
        const response = await axios.post(
          "https://api.sightengine.com/1.0/check.json",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        const probability = response.data.type.ai_generated;
        setProbability(probability);

        if (probability > 0.5) {
          alert(
            `It looks like your image is ${
              probability * 100
            }% AI generated. We have submitted your image for manual admin approval.`
          );
          // navigate("/home");
          return; // Skip the backend submission
        } else {
          await submitToBackend();
          // navigate("/home");
        }
      } catch (error) {
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
      }
    }
  };

  const submitToBackend = async () => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `public/${fileName}`;
    let { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);
    if (uploadError) {
      throw uploadError;
    }
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);
    if (urlError) {
      throw urlError;
    }
    const formData = {
      name: username,
      posts: {
        set: [
          {
            artwork: artworkName,
            description: description,
            competition: competition,
            image: publicUrlData.publicUrl,
          },
        ],
      },
    };

    let userID = "";

    // const fetchData = async () => {
    //   try {
    //     // Make the GET request
    //     const filter = JSON.stringify({ email: props.user.email });
    //     const response = await fetch(
    //       `https://us-east-2.aws.neurelo.com/rest/users?filter=${encodeURIComponent(
    //         filter
    //       )}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
    //         },
    //       }
    //     );
    //     // Check if the response is ok (status code 200-299)
    //     if (!response.ok) {
    //       console.log(response);
    //       throw new Error("Network response was not ok");
    //     }
    //     // Parse the JSON from the response
    //     const result = await response.json();
    //     // Set the fetched data to the state
    //     console.log(result);
    //     userID = result.data[0].id;
    //     console.log(userID);
    //   }
    //   catch (error) {
    //     // Set the error to the state
    //     console.log(error.message);
    //   }
    // };
    // await fetchData();
    // const patchData = async () => {
    //   console.log(userID);
    //   try {
    //     const response = await fetch(
    //       `https://us-east-2.aws.neurelo.com/rest/users/${userID}`,
    //       {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
    //         },
    //         body: JSON.stringify(formData),
    //       }
    //     );
    //     const result = await response.json();
    //     console.log(result);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
    // await patchData();
    const fetchData = async() => {
      return fetch(
        `https://us-east-2.aws.neurelo.com/rest/users?filter=${encodeURIComponent(
          JSON.stringify({ email: props.user.email })
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result.data[0].id;
        })
        .catch((error) => {
          console.log(error.message);
          throw error; // Rethrow the error to handle it in the calling function
        });
    };

    const patchData = async(userID) => {
      console.log(userID);
      return fetch(`https://us-east-2.aws.neurelo.com/rest/users/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchData()
      .then((userID) => patchData(userID))
      .catch((error) => {
        console.log("Error in fetchData or patchData:", error.message);
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
      {/* {userImage && (
        <img src={userImage} alt="Art" className="post__art-image" />
      )} */}
    </div>
  );
});

export default Submit;
