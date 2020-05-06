const express = require('express');

const Udb = require('./userDb.js');
const router = express.Router();


router.post('/api/posts', (req, res) => {
  // do your magic!
  Udb.insert(req.body)
  .then(udb => {
    res.status(201).json(udb);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        error: "There was an error while saving the post to the database" ,
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  Udb.insert(req.body)
  .then(udb => {
    res.status(201).json(udb);
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({
        message: "The post with the specified ID does not exist."  ,
    });
  });
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
