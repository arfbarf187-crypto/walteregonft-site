const { exec } = require("child_process");

exec("ffmpeg -i input.mp4 output.mp4", (error) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Video processed.");
  }
});