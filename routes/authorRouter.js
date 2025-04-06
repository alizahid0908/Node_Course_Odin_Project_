import express from 'express';
import authorController from '../controllers/authorController.js';
const authorRouter = express.Router();

authorRouter.get("/", (req, res)=>{
    res.send("Authors");
})

authorRouter.get("/:authorId", authorController.getAuthorById);


export default authorRouter;