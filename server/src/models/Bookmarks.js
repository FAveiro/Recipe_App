import mongoose from "mongoose"

const BookmarkSchema = new mongoose.Schema({
  urlRecipe: { type: String, required: true },
  username: {type:mongoose.Schema.Types.ObjectId, ref:"users"},
  information: {type: Object, required: true}
});

export const BookmarkModel = mongoose.model("bookmarks", BookmarkSchema)