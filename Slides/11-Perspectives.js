xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_perspectives", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/11-Perspectives.html", false);
xhttp.send();
