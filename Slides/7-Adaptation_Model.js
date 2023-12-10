xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_adaptation_mecanique", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/7-Adaptation_Model.html", false);
xhttp.send();
