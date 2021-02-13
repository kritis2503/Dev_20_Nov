const{sendRequest,
      acceptRequest,
      pendingRequests,
      deleteRequest,
      cancelRequest,
      deleteFollowing,
      deleteFollower,
      getAllFollowing,
      getAllFollower,
      getSuggestions}=require("../controller/requestController");

const requestRouter=require("express").Router();

requestRouter.route("").post(sendRequest);
requestRouter.route("/accept").post(acceptRequest);
requestRouter.route("/:uid").get(pendingRequests);

module.exports=requestRouter;
