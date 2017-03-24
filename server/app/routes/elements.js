const express = require('express');
const elements = require('../../db/models').element;
const router = require('express').Router();
module.exports = router;


router.get('/:id', (req, res, next) => {
  elements.findOne({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json(data).status(200);
    })
     .catch(next);
});

router.get('/layout/:id', (req, res, next) => {
  elements.findAll({
      where: { layoutId: req.params.id },
    })
    .then((data) => {
      res.json(data).status(200);
    })
     .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('elements', req.body);
  elements.create(req.body)
    .then((s) => {
      res.json(s).status(201);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  elements.update(req.body)
    .then((s) => {
      res.json(s).status(203);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  elements.destroy({ where: { layoutId: req.params.id } })
    .then((s) => {
      console.log('deleted');
      res.send('deleted').status(204);
    })
    .catch(next);
});

