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
  let imageType = image.slice(image.lastIndexOf(".") + 1);
  let imageNameWithExtension = image.split('\\').pop();
  let imageName = imageNameWithExtension.slice(0, imageNameWithExtension.lastIndexOf('.'));
  console.log(imageName)
  // console.log(image.split('\\').pop())
  // console.log(image.slice(image.lastIndexOf(".") + 1))

  let config = {
    headers:{
      "Content-Type": imageType, 
      "x-api-key": "bDIGszy43q1tj2xYi0WTZ5lEq6s5SdbY7DhKDAC0", 
      "x-amz-meta-customLabels": labels
    }
  };
  console.log(config)

  // url = 'https://e1371dfvrl.execute-api.us-east-1.amazonaws.com/coms6998-photos-bucket' + imageName
  // axios.put(url,imageNameWithExtension,config).then(response=>{
  //   window.alert("Successfully Upload!");
  // })

}
