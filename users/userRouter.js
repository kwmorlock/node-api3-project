const express = require('express');

const Udb = require('./userDb.js');
const router = express.Router();


router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const post = req.body
  post.user_id = Number(req.params.id)
  Udb.insert(post)
  .then((newPost) => {
    res.status(200).json(newPost);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
        message: "Error saving."  ,
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Udb.remove(req.params.id)
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

// router.put('/:id', validateUserId,validateUser, (req, res) => {
//   // do your magic!
//   // const changes = req.body;
//   Udb.update(id, req.body)
//     .then((updated) => {
//       if (updated === 1) {
//         res.status(200).send();
//       } else {
//         res.status(404).json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//           error: "The post information could not be modified."
//       });
//     });
// });

router.put("/:id", validateUserId, (req, res) => {
  console.log(req.body)
  Udb.update(Number(req.params.id), req.body)
  .then(result => {
    if (result === 1) {
      res.status(204).send()
    } else {
      res.status(500).json({ error: "error updating record" })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ error: "error connecting to database" });
  });
});



//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
Udb.getById(req.params.id)
.then((user) => {
  if(user) {
    req.user = user;
    next();
  }else {
    res.status(400).json({
      message: "The id does not exist",
    })
  }
})
.catch((error) =>{
  console.log(error);
  res
  .status(500)
  .json({
    error: "comments cant be retrieved"
  })
})
}

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length !== 0) {
    // if the length is not equal to zero than its a valid user
    //keys return an array of strings?
    req.body.name
      ? next()
      : res.status(400).json({ error: "provide name for the user." });
  } else {
    res.status(400).json({ error: "missing data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length !== 0) {
    //if the length is not to zero than its a valid post
    req.body.text
      ? next()
      : res.status(400).json({ error: " provide text for the post." });
  } else {
    res.status(400).json({ error: "missing data" });
  }

}

module.exports = router;
