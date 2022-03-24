const express = require('express');
require('express-async-errors');
const router = express.Router();
const dbo = require('../db/conn');

router.route('/search').get(async function (_req, res) {
  if(!_req.query.search)
  {
    return res.status(400).send({
      message: 'search parameter is required'
   });
  }
  var descendants = [];
  const dbConnect = dbo.getDb();
  const topic = await dbConnect.collection("topics").findOne({_id:_req.query.search});
  const children = await dbConnect.collection("topics").find({left:{$gt:topic.left}, 
  right:{$lt:topic.right}}).sort({left:1}).toArray();
    for(let child in children){
    if(children[child].leaf_node)
    {
    descendants.push(children[child]._id);
    }
    }
    var regex = descendants.join("|");
    const questions = await dbConnect.collection("questions").find({
      "annotations": {
          "$regex": regex, 
          "$options": "i"
      }
  }).project({_id: 0, annotations: 0}).toArray()
    res.send(questions);
  });

  module.exports = router;