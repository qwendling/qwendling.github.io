xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_decoupe", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/9-Decoupe.html", false);
xhttp.send();
