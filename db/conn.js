const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://app_user:Dubai2019@cluster0.ub0qx.mongodb.net/QuestionsAndTopics?authSource=admin&replicaSet=atlas-lz246a-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('QuestionsAndTopics');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
