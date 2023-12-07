xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      app.component("Slide_simulation_continue", {
        template: this.responseText,
      });
    }
  }
};
xhttp.open("GET", "./Slides/2-STAR_Simulation_Continue.html", false);
xhttp.send();
