const express = require('express');
const elements = require('../../db/models').element;
const router = require('express').Router();
module.exports = router;


router.get('/:id', (req, res, next) => {
    elements.findOne({
        where: {id: req.params.id}
    })
    .then((data)=>{
        res.json(data).status(200);
    })
})

router.post('/', (req,res,next)=>{
    elements.Create(req.body)
    .then((s)=>{
        res.json(s).status(201);
    })
})