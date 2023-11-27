// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { addComment, addPost, debug, getPost, addComment, editPost } from "../fake-db";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  const newPost = await addPost(req.body.title, req.body.link, user.id, req.body.description, req.body.subgroup)
  const post = await getPost(newPost.id)
  res.render("individualPost",{user,post})

});

router.get("/show/:postid", async (req, res) => {
  // ⭐ TODO
  const posts = await database.getPosts(20)
  const postid = await req.params.postid
  const post = await getPost(postid)
  const user = await req.user
  res.render("individualPost",{post, user});
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const postid = await req.params.postid
  const post = await getPost(postid)
  res.render("editPost", {post})
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const user = await req.user;
  const postid = await req.params.postid
  await editPost(postid,{link: req.body.link, description: req.body.description})
  const post = await getPost(postid)
  res.render("individualPost",{user,post})
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
    const user = await req.user
    const postid = await req.params.postid
    await addComment(postid,user.id,req.body.description)
    const post = await getPost(postid)
    res.render("individualPost",{post, user});
    
  }
  
);

export default router;
