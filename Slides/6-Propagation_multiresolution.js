xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_propagation", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/6-Propagation_multiresolution.html", false);
xhttp.send();
