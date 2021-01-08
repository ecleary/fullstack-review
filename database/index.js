const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const port = '27017';
const host = 'localhost';
const database = 'fetcher';
const uri = `mongodb://${host}:${port}/${database}`;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

let connection;
mongoose.connect(uri, options, (err) => {
  if (err) {
    console.error(err);
  } else {
    module.exports.connection = connection = mongoose.connection;
    console.log(`Successfully connected to MongoDB database ${database} with ID ${connection.id}`);
    connection.on('error', console.error);
    process.on(`SIGINT`, () => {
      const {pid} = process;
      connection.close();
      console.log(`\nMongoDB database ${database} connection has been closed`);
      console.log(`About to exit Node process ${pid}`);
      process.exit();
    });
  }
});

const repoSchema = new Schema({
  repoId: {type: String, required: true},
  info: {
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true}
  },
  owner: {
    userId: {type: String, required: true},
    username: {type: String, required: true}
  },
  stats: {
    stargazersCount: {type: Number, required: true},
    watchersCount: {type: Number, required: true},
    forksCount: {type: Number, required: true}
  }
});

module.exports.Repo = mongoose.model('Repo', repoSchema);

// let save = (/* TODO */) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

// module.exports.save = save;