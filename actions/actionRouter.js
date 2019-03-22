const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({ error: "The actions information could not be retrieved." })
    })
})

router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body
  if (!project_id || !description || !notes) {
    res.status(400).json({ errorMessage: "Please provide project_id and description and notes for the action." })
  }
  else if (description.length > 128) {
    res.status(400).json({errorMessage: "Description must be 128 characters or fewer."})
  }
  else {
    const action = {
      project_id: project_id,
      description: description,
      notes: notes
    }
    db.insert(action)
      .then(action => {
        db.get(action.id)
          .then(foundAction => {
            res.status(201).json(foundAction)
          })
          .catch(err => {
            res.status(500).json({ error: 'created, but could not get the action??' })
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the action to the database" })
      })
  }
})

router.get('/:id', (req, res) => {
  console.log('getting action', req.params.id)
  db.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(404).json({ message: "The action with the specified ID does not exist." })
    })
})

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(d => {
      console.log('delete thingy', d);
      if (d === 0) {
        res.status(404).json({ message: "The action with the specified ID does not exist." })
      }
      res.status(200).json({ message: "delete successful"})
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ error: "The action could not be removed" })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { project_id, description, notes, completed } = req.body
  if (!project_id || !description || !notes) {
    res.status(400).json({ errorMessage: "Please provide project_id and description and notes for the action." })
  }
  else {
    db.get(id)
      .then(action => {
        console.log('what is the update action?', action)
        if (description.length > 128) {
          res.status(400).json({errorMessage: "Description must be 128 characters or fewer."})
        }
        else {
          const actionToUpdate = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: completed
          }
          db.update(id, actionToUpdate)
            .then(num => {
              db.get(id)
                .then(foundAction => {
                  res.status(201).json(foundAction)
                })
                .catch(err => {
                  res.status(500).json({ error: 'updated, but could not get the action??' })
                })
            })
            .catch(err => {
              res.status(500).json({ error: "The action information could not be modified." })
            })
          }
      })
      .catch(err => {
        res.status(500).json({ error: "The action doesn't exist." })
      })
  }
})

module.exports = router