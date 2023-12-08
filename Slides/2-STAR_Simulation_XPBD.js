xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_simulation_xpbd", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/2-STAR_Simulation_XPBD.html", false);
xhttp.send();
