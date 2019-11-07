// selecting html elements
const img = document.getElementById("img");
const cat = document.querySelector(".show-cats");

// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  accept: function(file, url, done) {
    console.log(file);
    // console.log(file.previewElement);
    console.log(file.previewTemplate);
    img.src = file.upload.filename;

    // Tensor
    // Load the model.
    mobilenet.load().then(model => {
      console.log(model);
      // Classify the image.
      model.classify(img).then(predictions => {
        let predictionPercent = Math.floor(predictions[0].probability * 100);

        cat.textContent = `Is this a ${predictions[0].className} cat ? I am ${predictionPercent}% sure about this.`;

        console.log(predictions);
      });
    });
    // Tensor
  }
};
