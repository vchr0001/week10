var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) {
                return res.status(400).json(err);
            } else {
                res.json(movies);
            }
        }).populate('actors')
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({
                _id: req.params.id
            })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteMany:function(req,res){
        Movie.deleteMany({'year': {$lt:req.params.yearBefore}
        },function(err){
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({
                _id: req.body.id
            }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json();
                });
            })
        });
    },
   
    deleteActor: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            movie.actors.pull({
                _id: req.params.actorid
            })
            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        });
    },
    between: function (req, res) {
        let year2 = req.params.year2;
        let year1 = req.params.year1;
        Movie.where('year').gte(year2).lte(year1).exec(function (err, docs) {
            res.json(docs);
        });

    },
    increment: function(req,res){
        Movie.updateMany({'year': {$gte:1995}}, {$inc : {'year':7}}, {upsert: true}, function(err,data){
            res.json(data);
        })
        
    }
}