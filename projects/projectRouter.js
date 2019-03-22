const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel.js');

router.get('/:id/actions', (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(404).json({ message: "The project with the specified ID does not exist." })
    })
})

router.get('/', (req, res) => {
  console.log('projects are being requested');
  db.get()
    .then(projects => {
      console.log(projects)
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ error: "The projects information could not be retrieved." })
    })
})

router.post('/', (req, res) => {
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
  else {
    const project = {
      name: name,
      description: description,
      completed: false
    }
    db.insert(project)
      .then(project => {
        db.get(project.id)
          .then(foundProject => {
            res.status(201).json(foundProject)
          })
          .catch(err => {
            res.status(500).json({ error: 'created, but could not get the project??' })
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the project to the database" })
      })
  }
})

router.get('/:id', (req, res) => {
  console.log('getting project', req.params.id)
  db.get(req.params.id)
    .then(project => {
      console.log('getting project by id, got back:', project)
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(404).json({ message: "The project with the specified ID does not exist." })
    })
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  db.remove(req.params.id)
    .then(d => {
      if (d === 0) {
        res.status(404).json({ message: "The project with the specified ID does not exist." })
      }
      res.status(200).json({ message: "delete successful"})
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ error: "The project could not be removed" })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, description, completed } = req.body
  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
  else {
    db.get(id)
      .then(project => {
        if (project.length === 0) {
          res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
        else {
          const projectToUpdate = {
            name: name,
            description: description,
            completed: completed
          }
          db.update(id, projectToUpdate)
            .then(num => {
              db.get(id)
                .then(foundProject => {
                  res.status(201).json(foundProject)
                })
                .catch(err => {
                  res.status(500).json({ error: 'updated, but could not get the project??' })
                })
            })
            .catch(err => {
              res.status(500).json({ error: "The project information could not be modified." })
            })
          }
      })
      .catch(err => {
        res.status(500).json({ error: "The project information could not be modified." })
      })
  }
})

module.exports = router