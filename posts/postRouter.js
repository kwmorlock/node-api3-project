const express = require('express');

const Db = require('./postDb.js');

const router = express.Router();

router.get("/api/posts", (req, res) => {
  // do your magic!
  Db.find()
  .then(db => {
    res.status(200).json(db);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved.",
    });
  });
});

router.get("/api/users/:id", (req, res) => {
  // do your magic!
  Db.getById(req.params.id)
  .then(db => {
    if (db) {
      res.status(200).json(db);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the db",
    });
  });
});

router.delete("/api/posts/:id", (req, res) => {
  // do your magic!
  Db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The post has been removed" });
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed",
        });
      });
});

router.put("/api/posts/:id", (req, res) => {
  // do your magic!
  const changes = req.body;
    Db.update(req.params.id, changes)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be modified.",
        });
      });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
