xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_critere_adaptation", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/8-Critere_Adaptation.html", false);
xhttp.send();
