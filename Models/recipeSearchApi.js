const axios = require("axios");
let controller = require("../Controllers/exerciseController");
const recipeOptions = {
    method: 'GET',
    url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=759224de&app_key=09227d7d3c7f01cb3f9608f5a911b2da%09"
  };
module.exports = {
    recipe: function (food) {
        recipeOptions.url+="&q="+food
        console.log(recipeOptions.url)
        axios.request(recipeOptions).then(function (response) {
          recipeOptions.url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=759224de&app_key=09227d7d3c7f01cb3f9608f5a911b2da%09"
            //console.log(response.data)
            return response.data
          })
          .then(data=>{
            data.type = "recipeByName"
            console.log(data)
                controller.GetData(data)
        })
          .catch(function (error) {
            console.error(error);
          });
      }
}
  