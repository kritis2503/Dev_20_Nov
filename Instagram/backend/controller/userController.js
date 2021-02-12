const userModel=require("../model/userModel");

 async function createUser(req,res){
    try{
        let userObject=req.body;
        let userCreated=await userModel.create(userObject);
        res.json({
            message:"Successfully created User!!",
            userCreated
        })
    }
    catch(error){
        res.json({
            message:"Failed to create User!!",
            error
        })
    }
}
async function getAllUsers(req,res){
    try {
        let allUsers=await userModel.find();
        console.log(allUsers);
        res.json({
            message:"Successfully got all users!!",
            allUsers,
        });
    } catch (error) {
        res.json({
            message:"failed to get all the users!!",
            error,
        });
    }

}
async function getUserById(req,res){
try {
    let id=req.params.id;
    let user=await userModel.findById(id);
    res.json({
        message:"Successfully got the user",
        user,
    });
} catch (error) {
    res.json({
        message:"failed to get the user",
        error,
    });
}
}
async function updateUserById(req,res){
try {
    let updateObject=req.body;
    let id=req.params.id;
    let user=await userModel.findById(id);

    for(let key in updateObject){
        user[key]=updateObject[key];
    }
    let updatedUser=await user.save();
    console.log(updatedUser);
    res.json({
        message:"update successfully!",
        updatedUser
    })
} catch (error) {
    res.json({
        message:"update failed!",
        error
    })
}
}
async function deleteUserById(req,res){
try {
    let id=req.params.id;
    let deletedUser=await userModel.findByIdAndDelete(id);
    console.log(deletedUser);
    res.json({
        message:"sucessfully deleted!! ",
        deletedUser
    });
} catch (error) {
    res.json({
        message:"failed to delete!!",
        error
    })
}
}
module.exports.createUser=createUser;
module.exports.getAllUsers=getAllUsers;
module.exports.getUserById=getUserById;
module.exports.updateUserById=updateUserById;
module.exports.deleteUserById=deleteUserById;