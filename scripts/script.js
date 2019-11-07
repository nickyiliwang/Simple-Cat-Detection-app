// selecting html elements
const img = document.getElementById("img");
const cat = document.querySelector(".show-cats");
const testImg = document.querySelectorAll(".test-img");
const urlUpload = document.querySelector(".url-upload");
const urlInput = document.querySelector(".url-input");

// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  accept: function(file, done) {
    console.log(file);
    // console.log(file.previewElement);
    console.log(file.previewTemplate);
    img.src = file.upload.filename;

    tensorFlow();
  }
};

testImg.forEach(listener => {
  listener.addEventListener("click", e => {
    img.src = e.target.src;

    tensorFlow();
  });
});

urlUpload.addEventListener("submit", e => {
  e.preventDefault();

  img.src = urlInput.value;
  tensorFlow();
});

// Tensor
// this function just runs the classification function
const tensorFlow = () => {
  // Load the model.
  mobilenet.load().then(model => {
    console.log(model);
    // Classify the image.
    model.classify(img).then(predictions => {
      let predictionPercent = Math.floor(predictions[0].probability * 100);

      cat.textContent = `Is this a ${predictions[0].className} cat ? I am ${predictionPercent}% sure about this.`;
    });
  });
};
// Tensor
