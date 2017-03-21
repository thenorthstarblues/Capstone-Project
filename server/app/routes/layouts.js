const express = require('express');
const layout = require('../../db/models').layout;
const router = require('express').Router();
module.exports = router;


router.get('/:id', (req, res, next) => {
    layout.findOne({
        where: {id: req.params.id}
    })
    .then((data)=>{
        res.json(data).status(200);
    })
})

router.get('/', (req, res, next) => {
    layout.findAll({})
    .then((data)=>{
        res.json(data).status(200);
    })
})

router.post('/', (req,res,next)=>{
    layout.Create(req.body)
    .then((s)=>{
        res.json(s).status(201);
    })
})