const express = require("express")

const mongoose = require("mongoose")

const app = express()

const cors = require("cors")

const PORT = 8002

app.use(cors())

app.use(express.json())

const taskRoutes = require("./routes/task")
// const brandRoutes = require("./routes/brand")
// const productRoutes = require("./routes/product")
// const customerRoutes = require("./routes/customer")
const authRoutes = require("./routes/auth")
// const { verifyToken, isAdmin } = require("./middleware/auth-middleware")

// app.use("/category", verifyToken, isAdmin ,categoryRoutes)
// app.use("/brand", verifyToken, isAdmin , brandRoutes)
// app.use("/product", verifyToken, isAdmin , productRoutes)
// app.use("/customer", verifyToken, customerRoutes)
// app.use("/auth", authRoutes)

 
app.use("/task", taskRoutes)
// app.use("/brand", brandRoutes)
// app.use("/product", productRoutes)
// app.use("/customer", customerRoutes)
app.use("/auth", authRoutes)

// app.get("/", (req, res)=>{
//     res.send('This is Start Page')
// })
// app.get("/brand", (req, res)=>{
//     res.send('This is Brand Page')
// })

async function connectDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
        dbName: 'todo'
    })

    console.log("MongoDB connected");
    
}

connectDb().catch((err)=>{
    console.error(err);
    
}) 

app.listen(PORT, ()=>{console.log(`Server is running on ${PORT}`);
})