function search() {
  var searchTerm = document.getElementById("searchbar").value;
  console.log(searchTerm)
  var apigClient = apigClientFactory.newClient({ apiKey: "bDIGszy43q1tj2xYi0WTZ5lEq6s5SdbY7DhKDAC0" });

  var params = {
    "q": searchTerm
  };

  apigClient.searchGet(params, {}, {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(function (result) {
      showImages(result.data);
    }).catch(function (result) {
      console.log(result);
    });
}

function showImages(data) {
  var imagesDiv = document.getElementById("images")
  var urls = data["results"]

  var complete = ""
  var row = "<div class=\"row\">"
  for (let i = 0; i < urls.length; i++) {
    row += `<img src=${urls[i]} height="500">`
    if (i % 5 == 0) {
      row += "</div>"
      complete += row
      row = "<div class=\"row\">"
    }
  }

  if (row != "<div class=\"row\">") {
    complete += row
    complete += "</div>"
  }
  console.log(complete)
  imagesDiv.innerHTML += complete
}

function upload() {
  let image = document.getElementById("image").value;
	let labels = document.getElementById("labels").value;

}
