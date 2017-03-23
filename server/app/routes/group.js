const express = require('express');
const group = require('../../db/models').group;
const router = require('express').Router();
module.exports = router;


router.get('/:id', (req, res, next) => {
    group.findOne({
        where: {id: req.params.id}
    })
    .then((data)=>{
        res.json(data).status(200);
    })
     .catch(next)
})

router.get('/', (req, res, next) => {
    group.findAll({})
    .then((data)=>{
        res.json(data).status(200);
    })
     .catch(next)
})

router.post('/', (req,res,next)=>{
    group.create(req.body)
    .then((s)=>{
        res.json(s).status(200);
    })
     .catch(next)
})

router.put('/:id', (req,res,next)=> {
    group.update(req.body)
    .then((s)=>{
        res.json(s).status(203);
    })
    .catch(next)
})