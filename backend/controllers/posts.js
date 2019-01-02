const db = require("../models/database");

exports.createPost = (req, res, next) => {
  
  const url = req.protocol + "://" + req.get("host");
  let post = {
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.email
  };
  let sql = 'INSERT INTO blogposts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) {
      console.log("error ocurred",error);
      res.status(500).json({
        message: "Creating a post failed!"
      });
    } else{
      res.status(201).json({
        message: "Post added successfully"
      });
    }
  });
}
  

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  let post = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.email
  }
  
  let sql = `UPDATE blogposts SET title = '${post.title}', content = '${post.content}', imagePath = '${post.imagePath}' WHERE id = ${req.params.id} AND creator = '${req.userData.email}'`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Couldn't udpate post!");
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    } else {
      console.log("Update successful!");
      
      res.status(200).json({ 
        message: "Update successful!",
        post: post
      });
    }

  });
  
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let postsNum ;
  let sql = `SELECT * FROM blogposts LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`;
  let sql_max = 'SELECT COUNT(*) FROM blogposts';
  db.query(sql_max, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    } else {
      
      postsNum = result[0]['COUNT(*)'];
    }

  });
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log('get posts failed');
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    } else {
      
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: result,
        maxPosts: postsNum})
    }

  });
  
};


exports.getPost = (req, res, next) => {

  let sql = `SELECT * FROM blogposts WHERE id = ${req.params.id}`;
  db.query(sql,(err, result) => {
    if (err) {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    } else {
      res.status(200).json(result);
    }
    

  });
};

exports.deletePost = (req, res, next) => {

  let sql = `DELETE FROM blogposts WHERE id = ${req.params.id} AND creator = '${req.userData.email}'`;
  db.query(sql,(err, result) => {
      if (err) {
        res.status(500).json({
          message: "Deleting posts failed!"
        });
      } else {
        res.status(200).json({ message: "Deletion successful!" });
      }
    

  });
};
