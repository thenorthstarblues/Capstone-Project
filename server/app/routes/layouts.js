const express = require('express');
const layout = require('../../db/models').layout;
const router = require('express').Router();
module.exports = router;


router.get('/:id', (req, res, next) => {
  layout.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.json(data).status(200);
    })
     .catch(next);
});

router.get('/', (req, res, next) => {
  layout.findAll({})
    .then((data) => {
      res.json(data).status(200);
    })
     .catch(next);
});

router.get('/group/:id', (req, res, next) => {
  layout.findAll({where: {groupId: req.params.id}})
    .then((data) => {
      res.json(data).status(200);
    })
     .catch(next);
});


router.post('/', (req, res, next) => {
  layout.create(req.body)
    .then((s) => {
      res.json(s).status(200);
    })
     .catch(next);
});

router.put('/:id', (req, res, next) => {
  layout.update(req.body,
    { where: { id: req.params.id },
    })
    .then((s) => {
      res.json(s).status(203);
    })
    .catch(next);
});
