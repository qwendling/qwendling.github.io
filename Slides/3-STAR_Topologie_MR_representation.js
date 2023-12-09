xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_topologie_mr_representation", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/3-STAR_Topologie_MR_representation.html", false);
xhttp.send();
