import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Registration from "./components/Registration/Registration";
// import Statistics from "./components/Statistics/Statistics";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FacialRecognitionSystem from "./components/FacialRecognitionSystem/FacialRecognitionSystem";
import "./App.css";

function App() {
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [boxAreas, setBoxAreas] = useState([{}]);
  const [user, setUser] = useState([{}]);
  const [detectSelected, setDetectSelected] = useState(false);

  fetch("https://detekt-api.onrender.com/", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  }).catch(console.log);

  const setDefaultState = () => {
    setIsSignedIn(false);
    setImageUrl("");
    setBoxAreas([{}]);
    setUser([{}]);
    setDetectSelected(false);
  };

  const handleSignIn = (requestingUser) => {
    setUser(requestingUser);
    setIsSignedIn(true);
  };

  const handleRouteChange = (requestedRoute) => {
    if (requestedRoute !== "home") {
      setDefaultState();
    }
    setRoute(requestedRoute);
  };

  const handleButtonReset = () => {
    setDetectSelected(false);
  };

  const handleInputChange = (url) => {
    setBoxAreas([{}]);
    setImageUrl(url);
  };

  const handleButtonSubmit = (url) => {
    // Submit image URL to Clarifai API
    fetch("https://detekt-api.onrender.com/clarifai", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: url,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // Update database with items detected
        fetch("https://detekt-api.onrender.com/image", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemsdetected: response.outputs[0].data.regions.length,
            accountid: user.accountid,
          }),
        }).catch(console.log);
        displayFaceBoxes(calculateFaceLocations(response));
        setDetectSelected(true);
      })
      .catch((err) => console.log("Error loading image: ", err));
  };

  const calculateFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map((faceRegion) => {
      return faceRegion.region_info.bounding_box;
    });
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map((clarifaiFace) => {
      return {
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        rightCol: width - clarifaiFace.right_col * width,
      };
    });
  };

  const displayFaceBoxes = (boxes) => {
    setBoxAreas(boxes);
  };

  return (
    <div className="App">
      <Navigation
        route={route}
        handleRouteChange={handleRouteChange}
        isSignedIn={isSignedIn}
      />
      {route === "signin" ? (
        <section className="container">
          <SignIn
            handleRouteChange={handleRouteChange}
            handleSignIn={handleSignIn}
          />
        </section>
      ) : route === "registration" ? (
        <section className="container">
          <Registration handleRouteChange={handleRouteChange} />
        </section>
      ) : (
        <section className="container container--top">
          {/* <Statistics /> */}
          <ImageLinkForm
            handleInputChange={handleInputChange}
            handleButtonSubmit={handleButtonSubmit}
            inputUrl={imageUrl}
            detectSelected={detectSelected}
            handleButtonReset={handleButtonReset}
          />
          <FacialRecognitionSystem imageUrl={imageUrl} boxAreas={boxAreas} />
        </section>
      )}
    </div>
  );
}

export default App;
