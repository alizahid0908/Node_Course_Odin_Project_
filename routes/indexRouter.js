import {Router} from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res)=>{
    res.send("Home Page");
})

export default indexRouter;
