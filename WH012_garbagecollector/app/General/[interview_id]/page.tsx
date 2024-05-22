"use client"

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import React, { useState } from "react";
import Navbar from "@/components/ui/navbar";

const ExampleComponent = () => {
  const recorderControls = useAudioRecorder();
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState("");

  const handleRecordingComplete = (blob) => {
    setRecordedAudioBlob(blob);

    // Create URL from the audio blob
    const audioUrl = URL.createObjectURL(blob);
    setRecordedAudioUrl(audioUrl); // Store the URL for playback or further use

    // Log the audio URL to the console
    console.log("Recorded Audio URL:", audioUrl);
    // Automatically trigger download of the recorded audio
    downloadAudio(blob);
  };
  
  const downloadAudio = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded_audio.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Clean up the created <a> element
    URL.revokeObjectURL(url); // Revoke the URL to release resources
  };
  
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-md p-4">
      <AudioRecorder
        onRecordingComplete={(blob) => handleRecordingComplete(blob)}
        recorderControls={recorderControls}
      />
      <button
        onClick={recorderControls.stopRecording}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Stop recording
      </button>
      {recordedAudioBlob && (
        <audio controls className="mt-4">
          <source src={recordedAudioUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      {recordedAudioUrl === "" ? <></> : <a href={recordedAudioUrl}>click</a>}
    </div>
  );
};

const General = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <ExampleComponent />
      </div>
    </div>
  );
};

export default General;
