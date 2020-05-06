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
  Udb.get()
  .then(udb => {
    res.status(200).json(udb);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
  Udb.getById(req.params.id)
  .then(udb => {
    if (udb) {
      res.status(200).json(udb);
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Udb.getUserPosts(req.params.id)
  .then(messages => {
    res.status(200).json({ data: messages });
  })
  .catch(error => {
    console.log("error", error);

    res.status(404).json({
      message: "The post with the specified ID does not exist." ,
      error: error.message,
    });
  });
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
