let ApiData = require("../Models/APIData");
let exerciseModel = require("../Models/exercise");
let api = require("../Models/dietApi")
let apiRecipe = require("../Models/recipeSearchApi")
let exerciseData = [];
let apiExerciseData = [];
let filterBody;
let userChoosenFood;
let filteredExerciseData = [];
let filtered = false;
exports.GetData = function (apiInfo, type) {
    if (apiInfo.type == "listTargetMuscles") {
        this.RetreiveTargetMuscleData(apiInfo)
    }
    else if (apiInfo.type == "listByTargetMuscle") {
        this.RetreiveListByTargetMuscle(apiInfo)
    }
    else if (apiInfo.type == "listAllExercises") {
        this.RetreiveListAllExercises(apiInfo)
    }
    else if (apiInfo.type == "userExercise") {
        this.userExercise(apiInfo)
    }
    else if (apiInfo.type == "userExercise") {
        this.userExercise(apiInfo)
    }
    else if (apiInfo.type == "recipeByName") {
        console.log("yes!")
        this.recipeName(apiInfo)
    }
    else if (type == "choosenRecipe") {
        console.log("yes")
        this.userRecipe(apiInfo)
    }

    else if (apiInfo[20].type == "recipeCategory") {
        this.categoryRecipe(apiInfo)
    }
}
//Retreive data by muscle
exports.index = (req, res, next) => {
    exports.RetreiveTargetMuscleData = (data) => {
        //console.log(data)
    }
    ApiData.listTargetMuscles()
        .then(data => {
        })
        .catch(err => console.log(err));
}
exports.api = (req, res, next)=>{
    api.recipeCategory()
    
    exports.categoryRecipe = (data)=>{
        res.render("./exerciseViews/recipes", {data})
    }
    
}
exports.choosenRecipes = (req, res, next)=>{
    res.render("./exerciseViews/recipeName")
    
}
exports.userChoosenRecipe = (req, res, next)=>{
    userChoosenFood = req.body.food
    res.redirect("/exercises/recipeByName")
}
exports.recipeByName = (req, res, next)=>{
    console.log(userChoosenFood)
    apiRecipe.recipe(userChoosenFood)
    exports.recipeName = (data)=>{
        userChoosenFood=" "
        data.hits.forEach(recipe=>{
            //console.log(recipe)
        })
        res.render("./exerciseViews/userChoosenRecipe",{data})
    }
    
}
exports.recipe = (req, res, next)=>{
    api.recipe(req.body.recipe)
    exports.userRecipe = (data)=>{
        let category = data[0].category
        console.log(category)
        res.render("./exerciseViews/userRecipes", {data,category})
    }
    
}
exports.exercise = (req, res, next) => {
    exports.RetreiveListAllExercises = (data) => {

        for (const apiData in data) {
            exerciseData.push(apiData)
        }
        for (let i = 0; i < exerciseData.length; i++) {
            //console.log(exerciseData[i])
            apiExerciseData.push(data[exerciseData[i]])
            //console.log(data[exerciseData[i]])
        }
        if(filterBody){
            if(filtered){
                if(filterBody.equipment != ""){
                    filteredExerciseData = filteredExerciseData.filter(data=>data.equipment == filterBody.equipment)
                }
                if(filterBody.target != ""){
    
                    if(filterBody.equipment != ""){
                    filteredExerciseData = filteredExerciseData.filter(data=>data.target == filterBody.target)
    
                    }
                    filteredExerciseData = filteredExerciseData.filter(data=>data.target == filterBody.target)
                }
            }
            else{
                if(filterBody.equipment != ""){
                    filteredExerciseData = apiExerciseData.filter(data=>data.equipment == filterBody.equipment)
                }
                if(filterBody.target != ""){
    
                    if(filterBody.equipment != ""){
                    filteredExerciseData = filteredExerciseData.filter(data=>data.target == filterBody.target)
    
                    }
                    else{
                        filteredExerciseData = apiExerciseData.filter(data=>data.target == filterBody.target)

                    }
                }
            }
            console.log(filterBody.equipment)
            filtered = true;
        }
        console.log(apiExerciseData)
        if(filteredExerciseData.length != 0){
            req.flash("Success","You have successfully filtered the exercise data!")
            res.render("./exerciseViews/exercises", { filteredExerciseData, apiExerciseData })
        }
        else{
            res.render("./exerciseViews/exercises", { apiExerciseData, filteredExerciseData })   
        }
    }
    ApiData.listAllExercises()
        .then(data => {
        })
        .catch(err => console.log(err));
}
exports.filterExercise = (req, res, next) => {
    filterBody = req.body;
    res.redirect("/exercises/allExercises")
}
exports.removeFilter = (req, res, next) => {
    filteredExerciseData = []
    req.flash("Success","Successfully removed filter")
    res.redirect("/exercises/allExercises")
}
exports.userExercises = (req, res, next) => {
    exports.userExercise = (data)=>{
        let exercise = new exerciseModel(data);
        exercise.userId = req.session.user
        exercise.save()
        .then(exercise=>{
            req.flash("Success", "You have successfully added a workout to your Profile Page!")
            res.redirect("/profile")
        })
        .catch(err=>console.log(err));
    }
    let id = req.body.userData;
    console.log(id)
    ApiData.exerciseById(id)

    //res.redirect("/exercises/allExercises")
}
//exercises about target muscles
exports.target = (req, res, next) => {
    exports.RetreiveListByTargetMuscle = (data) => {
        for (const apiData in data) {
            console.log(`${apiData}: ${data[apiData].name}`);
        }
    }
    ApiData.listByTargetMuscle()
        .then(data => {
        })
        .catch(err => console.log(err));
}
//all exercises
exports.name = (req, res, next) => {
    exports.RetreiveListAllExercises = (data) => {
        for (const apiData in data) {
            exerciseData.push(apiData)
        }
        for (let i = 0; i < exerciseData.length; i++) {
            //console.log(exerciseData[i])
            console.log(data[exerciseData[i]])
        }
        ///console.log(exerciseData)
    }
    ApiData.listName()
        .then(data => {
        })
        .catch(err => console.log(err));
}
