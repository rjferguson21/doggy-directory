import React, { useEffect, useState } from "react";
import placeholderImg from "./images/undraw_relaxing_walk.svg";
import { Navbar } from "reactstrap";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setBreeds(Object.keys(json.message));
      });
  }, []);

  const searchByBreed = () => {
    setIsLoading(true);
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setIsLoading(false);
        setDogImages(json.message);
      });
  };

  return (
    <div className="d-flex justify-content-center flex-column text-center">
      <Navbar></Navbar>
    </div>
  );
}

export default App;
