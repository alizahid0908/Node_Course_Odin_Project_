import {Router} from "express";

const bookRouter = Router();

bookRouter.get("/", (req, res)=>{
    res.send("Books");
})

bookRouter.get("/:bookId", (req, res)=>{
    const {bookId} = req.params;
    res.send(`Book ID: ${bookId}`);
})      

export default bookRouter;
