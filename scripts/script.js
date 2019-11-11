// selecting html elements
const imageForPrediction = document.getElementById("img");
const cat = document.querySelector(".show-cats");
const testImg = document.querySelectorAll(".test-img");
const urlUpload = document.querySelector(".url-upload");
const urlInput = document.querySelector(".url-input");

// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  accept: function(file, done) {
    console.log(file);
    imageForPrediction.src = `./images/${file.upload.filename}`;
    tensorFlow();
  }
};

testImg.forEach(listener => {
  listener.addEventListener("click", e => {
    imageForPrediction.src = e.target.src;

    tensorFlow();
  });
});

urlUpload.addEventListener("submit", e => {
  e.preventDefault();

  imageForPrediction.src = urlInput.value;
  tensorFlow();
});

// Tensor
// this function just runs the classification function
const tensorFlow = () => {
  // Load the model.
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(imageForPrediction).then(predictions => {
      let predictionPercent = Math.floor(predictions[0].probability * 100);
      cat.textContent = `Is this a ${predictions[0].className} ? I am ${predictionPercent}% sure about my prediction.`;
    });
  });
};
// Tensor
