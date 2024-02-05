const videoEl = document.querySelector("video");

const width = 1000;
const height = (9 / 16) * width;

const bgImage = new Image(width, height);
bgImage.src = "img/bg.jpg";
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("2d");

const video = document.getElementById("video");

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

function background_removal(videoTrack) {
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

  const pat = ctx.createPattern(video, "no-repeat");
  ctx.fillStyle = pat;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Only overwrite missing pixels.
  ctx.globalCompositeOperation = "destination-atop";
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  ctx.restore();
}
