import {unsplash} from "../helpers/ToUnsplashConnection";
import DataBase from "../helpers/ToBaseConnect";
import {ObjectID} from "bson";


export const getAllProject = async function(){
    try {
      const collection = await DataBase("vue", "project")
        .find({})
        .asArray();
        return collection;
    } catch (error) {
      console.error(error);
    }
  }

export const getProject = async function(id){
  const projectID = new ObjectID(id);
    try {
      const collection = await DataBase("vue", "project")
        .find({_id: projectID}).asArray();
        return collection;
    } catch (error) {
      console.error(error);
    }
}

export const setComment = async function({id, newComment}){
  const projectID = new ObjectID(id);
    try {
      const collection = await DataBase("vue", "project").updateOne({_id: projectID}, { $push: {"Comments": newComment}});
        return collection;
    } catch (error) {
      console.error(error);
    }
}

export const getAuthor = async function(){
    try {
      const collection = await DataBase("vue", "executor")
        .find({})
        .asArray();
        return collection;
    } catch (error) {
      console.error(error);
    }
}

export const getRandomPhotos = async function(count){
    try {
      const data = await  unsplash.photos.getRandomPhoto({ count: count}).then(response => response.json());
      
      return data;
    } catch (error) {
      console.error(error);
    }
}

export default {
  getRandomPhotos,
  getAllProject,
  getProject,
  getAuthor,
  setComment
}