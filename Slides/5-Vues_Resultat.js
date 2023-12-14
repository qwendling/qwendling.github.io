xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        app.component("Slide_vues_resultat", {
          template: this.responseText,
        });
      }
    }
  };
  xhttp.open("GET", "./Slides/5-Vues_Resultat.html", false);
  xhttp.send();
  