const mysql= require("mysql2")

const connection=mysql.createConnection({host:"localhost",
user:"root",
password:"root",
database:"pictago"
})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('database pictago connected');
    }
})
module.exports=connection