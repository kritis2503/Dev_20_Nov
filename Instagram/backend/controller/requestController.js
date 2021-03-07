const followerModel=require("../model/followerModel");
const followingModel=require("../model/followingModel");
const userModel = require("../model/userModel");
//const userModel=require("../model/userModel");

async function sendRequest(req,res){
    try {
        console.log(req.body);
        let {uid,followId}=req.body;
        let doc=await userModel.find({_id: followId}).exec();
        console.log(doc);
        if(doc[0].isPublic){
            await followingModel.create({
                uid,
                followId,
            });
            await followerModel.create({
                uid:followId,
                followerId:uid
            });
            res.json({
                message:"Request sent and accepted!!"
            })
        }else{
            await followingModel.create({
                uid,
                followId,
                isAccepted:false
            });
            res.json({
                message:"Request send and pending !!"
            })
        }
    } catch (error) {
        res.json({
            message:"Failed to send request !!",
            error
        })
    }
}
//NOT WORKING
async function acceptRequest(req, res) {
    try {
      let { uid, toBeAccepted } = req.body;
      // change in following document
      let doc = await followingModel
        .find({ uid: toBeAccepted, followId: uid })
        .exec();
      console.log(doc);
      doc[0].isAccepted = true;
      await doc[0].save();
      await followerModel.create({
        uid,
        followerId: toBeAccepted,
      });
      res.json({
        message: "Request Accepted !",
      });
      // add in follower collection
    } catch (error) {
      res.json({
        message: "Failed to accept request !!",
        error,
      });
    }
  }
// async function acceptRequest(req,res){
    // try {
        //console.log(req);
        // let {uid,toBeAccepted}=req.body;
        // let doc=await followingModel.find({uid:toBeAccepted,followId:uid}).exec();
        // console.log(doc);
        // doc[0].isAccepted=true;
        // await doc[0].save();
// 
        // await followerModel.create({
            // uid,
            // followId:toBeAccepted
        // });
        // res.json({
            // message:"Request Accepted"
        // })
// 
    // } catch (error) {
        // res.json({
            // message:"Failed to accept request !!",
            // error
        // })
    // }
// }

async function pendingRequests(req,res){
    try {
        let {uid}=req.params;
        console.log(uid);
        let docs=await followingModel.find({followId:uid,isAccepted:false}).exec();
        console.log(docs);
        let requests=[];

        for(let i=0;i<docs.length;i++){
            let uid=docs[i].uid;
            let user=await userModel.findById(uid);
            requests.push(user);
        }

        console.log(requests);
        res.json({
            message:"Successfully got pending lists",
            requests
        });
    } catch (error) {
        res.json({
            message:"Failed to get request list !!",
            error
        })
    }
}

async function deleteRequest(req,res){
try {
    let {uid,followId}=req.body;
    await followingModel.findOneAndDelete({uid: followId,followId:uid}).exec();
    res.json({
        message:"Request succefully deleted !!"
    });

} catch (error) {
    res.json({
        message:"request deletion failed!!",
        error
    });
}
}

async function cancelRequest(req,res){
try {
    let {uid,followId}=req.body;
    await followingModel.findOneAndDelete({uid,followId}).exec();
    res.json({
        message:"follow Request Cancelled Successfully!"
    });
} catch (error) {
    res.json({
        message:"follow request not cancelled!",
        error
    })
}
}

async function deleteFollowing(req,res){

}

async function deleteFollower(req,res){

}

async function getAllFollowing(req,res){

}

async function getAllFollower(req,res){

}

async function getSuggestions(req,res){

}

module.exports.sendRequest=sendRequest;
module.exports.acceptRequest=acceptRequest;

module.exports.pendingRequests=pendingRequests;
module.exports.deleteRequest=deleteRequest;
module.exports.cancelRequest=cancelRequest;

module.exports.deleteFollowing=deleteFollowing;
module.exports.deleteFollower=deleteFollower;

module.exports.getAllFollower=getAllFollower;
module.exports.getAllFollowing=getAllFollowing;
module.exports.getSuggestions=getSuggestions;