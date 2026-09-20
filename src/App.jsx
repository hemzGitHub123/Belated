
import BirthdayStory from "./BirthdayStory";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import "./App.css";

function App() {
  const videoRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [status, setStatus] = useState("Loading AI...");
  const [recognized, setRecognized] = useState(false);
  const [referenceDescriptors, setReferenceDescriptors] = useState([]);

  useEffect(() => {
    loadModels();

    return () => {
      stopCamera();
    };
  }, []);

  async function loadModels() {
    try {
      setStatus("Loading face recognition...");

      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      setModelsLoaded(true);
      setStatus("Loading Ragi's face...");

      const descriptors = await loadReferenceFaces();

      setReferenceDescriptors(descriptors);

      setStatus("Ready ❤️");
    } catch (error) {
      console.error("Model/reference loading error:", error);
      setStatus("Failed to load face recognition.");
    }
  }

  async function loadReferenceFaces() {
    const referenceImages = [
      "/reference/raji.jpeg",
      "/reference/raji2.jpeg",
      "/reference/raji3.jpeg",
      "/reference/raji4.jpeg",
      "/reference/raji5.jpeg",
    ];

    const descriptors = [];

    for (const imagePath of referenceImages) {
      try {
        const image = await faceapi.fetchImage(imagePath);

        const detection = await faceapi
          .detectSingleFace(
            image,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 320,
              scoreThreshold: 0.5,
            })
          )
          .withFaceLandmarks(true)
          .withFaceDescriptor();

        if (detection) {
          descriptors.push(detection.descriptor);
        }
      } catch (error) {
        console.error(
          "Failed to process reference image:",
          imagePath,
          error
        );
      }
    }

    if (descriptors.length === 0) {
      throw new Error(
        "No faces detected in any reference images."
      );
    }

    return descriptors;
  }

  async function startCamera() {
    if (
      !modelsLoaded ||
      referenceDescriptors.length === 0
    ) {
      return;
    }

    try {
      setStatus("Starting camera...");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        setCameraStarted(true);
        setStatus("Look at the camera...");
      }
    } catch (error) {
      console.error("Camera error:", error);
      setStatus("Camera permission is required.");
    }
  }

  async function checkFace() {
    if (
      !videoRef.current ||
      referenceDescriptors.length === 0
    ) {
      return;
    }

    try {
      setStatus("Checking your face...");

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 320,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks(true)
        .withFaceDescriptor();

      if (!detection) {
        setStatus("I can't see your face...");
        return;
      }

      const distances =
        referenceDescriptors.map((descriptor) =>
          faceapi.euclideanDistance(
            descriptor,
            detection.descriptor
          )
        );

      const distance = Math.min(...distances);

      const THRESHOLD = 0.50;

      if (distance < THRESHOLD) {
        setRecognized(true);
        setStatus("Welcome Ragi ❤️");
        stopCamera();
      } else {
        setStatus(
          "Hmm... I don't recognize you 😏"
        );
      }
    } catch (error) {
      console.error("Face verification error:", error);

      setStatus(
        "Something went wrong while checking your face."
      );
    }
  }

  function stopCamera() {
    const video = videoRef.current;

    if (!video || !video.srcObject) {
      return;
    }

    const tracks = video.srcObject.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    video.srcObject = null;
    setCameraStarted(false);
  }

  if (recognized) {
    return <BirthdayStory />;
  }

  return (
    <div className="face-lock">
      <div className="content">

        <div className="top-decoration">
          <span>♡</span>
          <span>✦</span>
          <span>♡</span>
        </div>

        <p className="tiny">
          A LITTLE SURPRISE
        </p>

        <h1>
          Before we begin...
        </h1>

        <p className="description">
          We need to make sure you're
          actually the person this surprise
          was made for.
        </p>

        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />

          {!cameraStarted && (
            <div className="camera-placeholder">
              <div className="camera-icon">
                📷
              </div>

              <span>
                Your camera will appear here
              </span>
            </div>
          )}
        </div>

        <p className="status">
          {status}
        </p>

        {!cameraStarted &&
          modelsLoaded &&
          referenceDescriptors.length > 0 && (
            <button
              className="start-button"
              onClick={startCamera}
            >
              <span>Start Camera</span>
              <span className="button-icon">
                →
              </span>
            </button>
          )}

        {cameraStarted && (
          <button
            className="verify-button"
            onClick={checkFace}
          >
            <span>Verify Me</span>
            <span>❤️</span>
          </button>
        )}

        {!modelsLoaded && (
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        )}

        <p className="privacy-note">
          Your camera is only used to verify the surprise.
        </p>

      </div>
    </div>
  );
}

export default App;

