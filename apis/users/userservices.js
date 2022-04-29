const { result } = require("lodash");
const pool = require("../../config/database")


module.exports = {
    create: (data,callBack) =>{
        //  console.log(data);
     pool.query(`insert into users(name,email,password,phonenumber,image) values(?,?,?,?,?)`,
     
     [data.name,
    data.email,
    data.password,
    data.phonenumber,
    data.image
],

(error,result,fields) => {
    if(error){
      return  callBack(error);
    }
   
    return callBack(null,result)
})
    },
    getUSers: callBack => {
        pool.query(`select id,name,email,phonenumber,image from users`,[],
        (error,results,fields) => {
            if(error){
                return callBack(error)
            }else{
                return callBack(null, results)
            }
        })
    },
    getUserById : (id, callBack) => {
        pool.query(
            `select id,name,email,phonenumber,image from users where id = ?`,
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update users set name= ? , email= ?, phonenumber= ?,image = ?,password= ? where id= ?`,
            [data.name,
            data.email,
            data.phonenumber,
            data.image,
            data.password,
            data.id
        ],
        (error, results, fields) =>{
            if(error){
                return callBack(error)
            }else{
                return callBack(null, results)
            }
        }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [data.id],
            (error,results,fields) => {
                if(error){
                    return callBack(error)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    },
    getUSersByemail: (email,callBack) => {
        pool.query(`select * from users where email = ?`,[email],
        (error,results,fields) => {
            if(error){
                return callBack(error)
            }else{
                return callBack(null, results[0])
            }
        })
    },

}