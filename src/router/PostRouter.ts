import { Router, Request, Response, NextFunction } from "express";
import Post from "../models/Post";

class PostRouter {
  constructor(public router: Router) {
    this.routes();
  }
  public getPosts(req: Request, res: Response) {
    Post.find()
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(error => {
        const status = res.statusCode;
        res.json({ status, error });
      });
  }
  routes() {
    this.router.get("/", this.getPosts);
  }
}
const postRoutes = new PostRouter(Router());
export default postRoutes.router;
