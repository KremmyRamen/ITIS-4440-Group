let User = require("../Models/user")
let exercises = require("../Models/exercise")
exports.index = (req, res, next)=>{
    res.render("./exerciseViews/index")
}
exports.signup = (req, res, next)=>{
    res.render("./mainViews/newUser")
}
exports.login = (req, res, next)=>{
    res.render("./mainViews/login")
}
exports.userLogin = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
        .then(result => {
            req.flash("Success", "Successful signup ");
            res.redirect("/login");
        })
        .catch(err => {
            console.log(err)
            if (err.name === "ValidationError") {
                req.flash("Error", err.message);
                return res.redirect("/signup");
            }
            if (err.code === 11000) {
                req.flash("Error", "Email address has already been used");
                return res.redirect("/signup");
            }
            next(err);
        });
}
exports.profile = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        console.log(user._id)
                        if (result) {
                            req.session.user = {_id: user._id, name: user.firstName};
                            req.flash("Success", "You have successfully logged in")
                            res.redirect("/profile");
                        }
                        else {
                            req.flash("Error", "Wrong password")
                            res.redirect("/login");
                        }
                    })
            }
            else {
                req.flash("Error", "Wrong email")
                res.redirect("/login");
            }
        })
        .catch(err => next(err));
}
exports.userProfile = (req, res, next)=>{
    exercises.find({userId: req.session.user})
                            .then(exercises=>{
                                res.render("./mainViews/profile",{exercises})
                            })
                            .catch(err=>console.log(err))
}
exports.removeExercise = (req, res, next)=>{
    exercises.findByIdAndDelete(req.body.exerciseData)
    .then(result=>{
        console.log("result")
        console.log(result)
        if(result){
            req.flash("Success","You have successfully removed a workout from the Profile Page!")
            res.redirect("/profile")
        }
    })
    .catch(err=>console.log(err));
}
exports.logout = (req, res, next)=>{
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        else {
            res.redirect("/login");
        }
    })
}