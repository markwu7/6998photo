var apigClient = apigClientFactory.newClient({ apiKey: "bDIGszy43q1tj2xYi0WTZ5lEq6s5SdbY7DhKDAC0" });
function search() {
  var searchTerm = document.getElementById("searchbar").value;
  console.log(searchTerm)
  

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
  let image_src = document.getElementById("image");
  let image = image_src.value;
	let labels = document.getElementById("labels").value;
  let imageType = image.slice(image.lastIndexOf(".") + 1);
  let imageNameWithExtension = image.split('\\').pop();
  let imageName = imageNameWithExtension.slice(0, imageNameWithExtension.lastIndexOf('.'));
  // console.log(imageName)
  // console.log(image.split('\\').pop())
  // console.log(image.slice(image.lastIndexOf(".") + 1))

  const file = image_src.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function() {
      var body = reader.result;
      
      
      // Do something with the binary data
      console.log(binary)
      let config = {
        headers:{
          "Content-Type": "application/json", 
          "x-api-key": "bDIGszy43q1tj2xYi0WTZ5lEq6s5SdbY7DhKDAC0", 
          "x-amz-meta-customLabels": labels,
          "Access-Control-Allow-Origin": "*"
        }
      };
      apigClient.invokeApi({}, {}, "PUT", config, body)
      .then(function(result){
          //This is where you would put a success callback
          console.log(result);
      }).catch( function(result){
          //This is where you would put an error callback
      });
      
    
      // url = 'https://e1371dfvrl.execute-api.us-east-1.amazonaws.com/test-stage/upload/coms6998-photos-bucket/' + imageNameWithExtension
      // axios.put(url,binary,config).then(response=>{
      //   window.alert("Successfully Upload!");
      // })
  });
  

  
  // reader.readAsBinaryString(file);
}
