xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_vues_relation", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/5-Vues_Relation.html", false);
xhttp.send();
