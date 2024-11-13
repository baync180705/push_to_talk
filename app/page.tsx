"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("speech Recogniition is not supported by browser")
    }
  }, [])
  const [isRec, setIsRec] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<any[]>([]);
  const [transcript, setTranscript] = useState<String>("hello");
  const recorderRef = useRef<MediaRecorder | null>(null); // Use ref to store the recorder

  const recordingEvent = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (stream.active) {
      console.log("Stream is active");

      if (isRec) {
        recorderRef.current?.stop();
        console.log("Recording stopped");
        setIsRec(false); 
      } else {
        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          console.log("Data available: ", event.data);
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };

        recorder.onstop = () => {
          console.log("Saving...");
          const blob = new Blob(audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'recording.mp3';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); 
          console.log("Saved recording");
        };

        recorder.start();
        console.log("Recording started");
        setIsRec(true); 
      }
    }
  }
  return (
    <main className="bg-gray-800 h-screen w-screen flex flex-col justify-around items-center">
      <h1 className="text-7xl font-bold">Push Button to Record</h1>
      {isRec && <p>Recoding...</p>}
      <button onClick={recordingEvent}><Image src='record-button-svgrepo-com.svg' alt="record button" width={500} height={500}></Image></button>
      {isRec && <p>{transcript}</p>}
    </main>
  );
}
