let ApiData = require("../Models/APIData");
let exerciseData= [];
exports.GetData = function(apiInfo){
    if(apiInfo.type == "listTargetMuscles"){
        this.RetreiveTargetMuscleData(apiInfo)
    }
    else if(apiInfo.type == "listByTargetMuscle"){
        this.RetreiveListByTargetMuscle(apiInfo)
    }
    else if(apiInfo.type == "listAllExercises"){
        this.RetreiveListAllExercises(apiInfo)
    }
}
//Retreive data by muscle
exports.index =  (req, res, next)=>{
    exports.RetreiveTargetMuscleData= (data)=>{
        console.log(data)
    }
    ApiData.listTargetMuscles()
    .then(data=>{
    })
    .catch(err=>console.log(err));
}
//exercises about target muscles
exports.target =  (req, res, next)=>{
    exports.RetreiveListByTargetMuscle = (data)=>{
        for(const apiData in data ){
            console.log(`${apiData}: ${data[apiData].name}`);
        }
    }
    ApiData.listByTargetMuscle()
    .then(data=>{
    })
    .catch(err=>console.log(err));
}
//all exercises
exports.exercise =  (req, res, next)=>{
    exports.RetreiveListAllExercises = (data)=>{
        for(const apiData in data ){
            exerciseData.push(apiData)
        }
        for(let i = 0; i <exerciseData.length; i++){
            //console.log(exerciseData[i])
            console.log(data[exerciseData[i]])
        }
        ///console.log(exerciseData)
    }
    ApiData.listAllExercises()
    .then(data=>{
    })
    .catch(err=>console.log(err));
}
exports.name =  (req, res, next)=>{
    exports.RetreiveListAllExercises = (data)=>{
        for(const apiData in data ){
            exerciseData.push(apiData)
        }
        for(let i = 0; i <exerciseData.length; i++){
            //console.log(exerciseData[i])
            console.log(data[exerciseData[i]])
        }
        ///console.log(exerciseData)
    }
    ApiData.listName()
    .then(data=>{
    })
    .catch(err=>console.log(err));
}
