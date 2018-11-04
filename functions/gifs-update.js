import faunadb from "faunadb";
import getId from "./utils/getId";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  const id = getId(event.path);
  console.log(`Function 'gif-update' invoked. update id: ${id}`);
  return client
    .query(
      q.Let(
        { gif: q.Get(q.Ref(`classes/gifs/${id}`)) },
        q.Lambda(
          q.Update(q.Ref(`classes/gifs/${id}`), {
            data: { votes: q.Select(["data", "votes"], q.Var("gif")) + 1 }
          })
        )
      )
    )
    .then(response => {
      console.log("success", response);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
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
