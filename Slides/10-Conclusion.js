xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_conclusion", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/10-Conclusion.html", false);
xhttp.send();
