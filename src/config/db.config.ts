
//importing modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

  
// const username = process.env.username
// const password = process.env.password

const dbName = 'CRUD'



const connectionString = `mongodb://127.0.0.1:27017/${dbName}`
const options = {
    autoIndex: false, 
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
  };

//db connection
export const db = mongoose.connect(connectionString, options)
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})