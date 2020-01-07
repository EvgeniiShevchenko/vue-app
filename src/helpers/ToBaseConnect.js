import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from "mongodb-stitch-browser-sdk";

const appId = "app-gzhil";
const client = Stitch.initializeDefaultAppClient(appId);
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`);
});

const mongodb = client.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);

export default function(baseName = "test", collectionName = "genres") {
  const db = mongodb.db(baseName);
  const collection = db.collection(collectionName);
  return collection;
}