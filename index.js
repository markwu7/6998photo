function search() {
    var searchTerm = document.getElementById("searchbar").value;
    var apigClient = apigClientFactory.newClient({ apiKey: “xxxxxxxxxxxx” });
  
    var params = {
      "q": searchTerm
    };
  
    apigClient.searchGet(params, {}, {})
      .then(function (result) {
        showImages(result.data);
      }).catch(function (result) {
        console.log(result);
      });
  }


function showImages() {


}
