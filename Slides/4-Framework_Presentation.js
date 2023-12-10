xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_framework_presentation", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/4-Framework_Presentation.html", false);
xhttp.send();
