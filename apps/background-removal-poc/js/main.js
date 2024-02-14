import {
  FaceDetector,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const videoEl = document.querySelector("video");

const width = 1000;
const height = (9 / 16) * width;

// const bgImage = new Image(width, height)
// bgImage.src = "img/bg.jpg"
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("2d");

const video = document.getElementById("video");
const audio = document.getElementById("audio");
const bpmDisplay = document.getElementsByClassName("bpm-display")[0];
const songNameL = document.getElementsByClassName("song-name-l")[0];
const songNameS = document.getElementsByClassName("song-name-s")[0];
const songcoverL = document.getElementsByClassName("song-cover-l")[0];
const songcoverS = document.getElementsByClassName("song-cover-s")[0];
const songartistL = document.getElementsByClassName("song-artist-l")[0];

const audioContext = new AudioContext();
const track = audioContext.createMediaElementSource(audio);

track.connect(audioContext.destination);

let noFaceCount = 0;

let videoBg = false;

let faceDetector;

navigator.mediaDevices
  .getUserMedia({
    video: {
      width: width,
      height: height,
      frameRate: { ideal: 15, max: 30 },
    },
    audio: false,
  })
  .then((stream) => {
    /* use the stream */

    background_removal(stream.getVideoTracks()[0]);
  })
  .catch((err) => {
    /* handle the error */
    console.error("An error has ocurred:", err);
  });

async function background_removal(videoTrack) {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      delegate: "GPU",
      // delegate: "CPU",
    },
    runningMode: "IMAGE",
  });

  console.log("Face detector loaded");

  const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
  });

  selfieSegmentation.setOptions({
    modelSelection: 1,
    selfieMode: true,
  });

  selfieSegmentation.onResults(onResults);

  const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
  const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });

  const transformer = new TransformStream({
    async transform(videoFrame, controller) {
      videoFrame.width = videoFrame.displayWidth;
      videoFrame.height = videoFrame.displayHeight;
      await selfieSegmentation.send({ image: videoFrame });
      const detections = faceDetector.detect(videoFrame);

      if (detections.detections.length == 0) {
        noFaceCount++;
      } else {
        if (noFaceCount > 15) {
          // call new
          console.log("New face detected");
          fetch("http://localhost:4000/retrieve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              count: detections.detections.length,
            }),
          })
            .then((r) => r.json())
            .then((res) => {
              console.log("Retrieving new face", res);
            });
          fetch("http://localhost:4000/display")
            .then((r) => r.json())
            .then((res) => {
              console.log("Displaying new face", res.data);

              audio.src = `./songs/${res.data.song.id}.mp3`;

              if (audioContext.state === "suspended") {
                audioContext.resume();
              }
              audio.play();

              bpmDisplay.textContent = "";
              for (const bpmVal of res.data.bpm) {
                bpmDisplay.textContent += "BPM: " + bpmVal + "  ";
              }
              songNameL.textContent = res.data.song.name;
              songNameS.textContent =
                res.data.song.name + " - " + res.data.song.artist;
              songcoverL.src = `./songs/${res.data.song.id}.jpg`;
              songcoverS.src = `./songs/${res.data.song.id}.jpg`;
              songartistL.textContent = res.data.song.artist;
            });

          video.src = "./img/bg.mp4";

          video.play();
          video.muted = true;

          videoBg = true;
          noFaceCount = 0;
        }
      }

      const timestamp = videoFrame.timestamp;
      const newFrame = new VideoFrame(canvas, { timestamp });

      videoFrame.close();
      controller.enqueue(newFrame);
    },
  });

  trackProcessor.readable
    .pipeThrough(transformer)
    .pipeTo(trackGenerator.writable);

  const processedStream = new MediaStream();
  processedStream.addTrack(trackGenerator);
  videoEl.srcObject = processedStream;
}

function onResults(results) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-out";

  if (videoBg) {
    const pat = ctx.createPattern(video, "no-repeat");
    ctx.fillStyle = pat;
  }

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-atop";
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  ctx.restore();
}
