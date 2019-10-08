const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
  getAll: function (req, res) {
    Actor.find(function (err, actors) {
      if (err) {
        return res.json(err);
      } else {
        res.json(actors);
      }
    }).populate('movies');
  },
  extraTask: function (req, res) {
    Actor.find(function (err, actors) {
      if (err) {
        return res.json(err);
      } else {
        let extraDB = [];
        for (let i = 0; i < actors.length; i++) {
          if (actors[i].movies.length >= 2) {
            extraDB.push(actors[i]);
          }
        }
        res.json(extraDB);
      }
    }).populate('movies');
  },
  createOne: function (req, res) {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();
    let actor = new Actor(newActorDetails);
    actor.save(function (err) {
      console.log('Done');
      res.json(actor);
    });
  },
  getOne: function (req, res) {
    Actor.findOne({
      _id: req.params.id
    }).populate('movies').exec(function (err, actor) {
      if (err) return res.json(err);
      if (!actor) return res.json();
      res.json(actor);
    })
  },
  updateOne: function (req, res) {
    Actor.findOneAndUpdate({
      _id: req.params.id
    }, req.body, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      res.json(actor);
    });
  },
  deleteOne: function (req, res) {

    Actor.findOneAndRemove({
      _id: req.params.id
    }, function (err, data) {
      for (let i = 0; i < data.movies.length; i++) {
        Movie.findOneAndRemove({
          _id: data.movies[i]
        }, function (err) {
          if (err) return res.status(400).json(err);
          res.json(data);
        })
      }
      if (err) return res.status(400).json(err);
      res.json(data);
    });
  },
  addMovie: function (req, res) {
    Actor.findOne({
      _id: req.params.id
    }, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      Movie.findOne({
        _id: req.body.id
      }, function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        actor.movies.push(movie._id);
        actor.save(function (err) {
          if (err) return res.status(500).json(err);
          res.json(actor);
        });
      })
    });
  },
  deleteMovie: function (req, res) {
    Actor.findOne({
      _id: req.params.id
    }, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      actor.movies.pull({
        _id: req.params.movid
      })
      actor.save(function (err) {
        if (err) return res.status(500).json(err);
        res.json(actor);
      });
    });
  }
}
