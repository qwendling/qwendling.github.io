xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_contexte", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/1-Contexte.html", false);
xhttp.send();
