let express = require("express");
let morgan = require("morgan");
let methodOverride = require("method-override");
let exerciseRoutes = require("./Routes/exerciseRoutes");
let mainRoutes = require("./Routes/mainRoutes");
let port = 8080;
let host = "localhost";

const app = express();
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(morgan("tiny"));

app.use("/exercises", exerciseRoutes)
app.use("/", mainRoutes)

app.use((err,req,res,next)=>{
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server error");
    }
    console.log(err)
});

app.listen(port, host,()=>{
    console.log("Server is running on port "+port)
})
