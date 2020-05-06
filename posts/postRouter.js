const express = require('express');

const Db = require('./postDb.js');

const router = express.Router();

router.get("/api/posts", (req, res) => {
  // do your magic!
  Db.find(req.query)
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

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
