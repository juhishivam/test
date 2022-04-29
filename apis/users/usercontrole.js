const {create,getUSers,getUserById,updateUser,deleteUser,getUSersByemail} = require("./userservices");

const {genSaltSync,hashSync, compareSync} = require("bcrypt");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUsers: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.image = req.file.filename;
        console.log("image===",body.image);
        body.password = hashSync(body.password,salt);
        console.log(req.file);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                })
            }
            // console.log("results",data);
            return res.status(200).json({
                success:1,
                data:results,
                // image:`http://localhost:3000/image/${req.file.filename}`
            })
        })
    },
    getUserById: (req,res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },
    getUSers: (req,res) => {
       
        getUSers((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },
    updateUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.image = req.file.filename;
        body.password = hashSync(body.password,salt);
        console.log(req.file);
        updateUser(body, (err, results) => {
            if(err){
      
console.log(err);
return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:" not updated successfully "
                });
            }
            // console.log("results",data);
            return res.json({
                success:1,
                message:"data updated successfully",
            })
        })
    },
    deleteUser: (req,res) => {
        const data = req.body;

        deleteUser(data, (err, results) => {
            if(err){
      
console.log(err);
return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                message:"data deleted successfully",
            })
            
        })
    },
    login: (req,res) =>{
        const body= req.body;
        getUSersByemail(body.email, (err,results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, "qwe1234",{
                    expiresIn:"1h"
                })
                return res.json({
                    success:1,
                    message:"loginsuccessfully",
                    token: jsontoken
                })
            }else{
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                });
            }


        })
    }
    
}