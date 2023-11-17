const xhttp = new XMLHttpRequest();
let text;
xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status === 200) {
      text = this.responseText;
    }
  }
};
xhttp.open("GET", "./Slides/1-Contexte.html", false);
xhttp.send();
app.component("Slide_contexte", {
  template: text,
});
