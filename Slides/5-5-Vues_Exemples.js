xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_vues_exemples", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/5-5-Vues_Exemples.html", false);
xhttp.send();
