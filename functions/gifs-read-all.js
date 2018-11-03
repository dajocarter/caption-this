import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  console.log("Function `gif-read-all` invoked");
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_gifs"))))
    .then(response => {
      const gifRefs = response.data;
      console.log("Gif refs", gifRefs);
      console.log(`${gifRefs.length} gifs found`);
      // create new query out of gif refs. http://bit.ly/2LG3MLg
      const getAllGifDataQuery = gifRefs.map(ref => {
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllGifDataQuery).then(ret => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        });
      });
    })
    .catch(error => {
      console.log("error", error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      });
    });
};
