import db from "../db.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";

async function getAuthorById(req, res){
    const {authorId} = req.params;
    try{
        const author = await db.getAuthorById(authorId);
        if(!author){
            throw new CustomNotFoundError("Author not found");
        }else{
            res.json(author);
        }
    }catch(error){
        throw error;
    }
}

export default {getAuthorById};
