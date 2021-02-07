const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db.js');
const Leader = db.Leader;

var ObjectID = require('mongodb').ObjectID;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    Leader.find({}).toArray((err, result) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(result);
        }
      });
}

async function getById(id) {

    	const details = { '_id': id };
	    
	    Leader.findOne(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(item);
	      }
	    });
}

async function create(params) {
    const score = { name: params.name, score: params.score };
    await Leader.insertOne(score, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
}

async function update(id,body) {

	    const details = { '_id': id };
	    const newscore = { name: req.body.name, score: req.body.score };
	    Leader.update(details, newscore, (err, result) => {
	      if (err) {
	          res.send({'error':'An error has occurred'});
	      } else {
	          res.send(newscore);
	      } 
	    });
}

async function _delete(id) {

    const details = { '_id': id };
    Leader.remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('score ' + id + ' deleted!');
      } 
    });
}