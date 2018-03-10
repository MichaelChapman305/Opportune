const express = require('express');
const router = express.Router();
const JobListing = require('./models.js');
const request = require('superagent');

router.use(require("body-parser").json());

const ORDER_BY_SCORE = {
  score: {
    $meta: 'textScore',
  }
};

router.post('/subscribe', (req, res) => {
  request
    .post('https://us12.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_KEY ).toString('base64'))
    .send({
      'email_address': req.body.email,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': req.body.firstName,
        'LNAME': req.body.lastName
      }
    })
    .end((err, response) => {
      if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
        res.send('Signed Up!');
      } else {
        res.send(response.body.title);
      }
    });
});

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

router.get('/jobs', (req, res) => {
  const queryText = req.query.query;

  if (!queryText) {
    return JobListing.find({}).exec().then(items => res.send(items));
  }

  let query = {};

  try {
    query = JSON.parse(queryText);
  }
  catch (e) {
    return res.status(400).send({ error: e });
  }

  const searchQuery = {};
  const addToSearchQuery = (field, queryOperator, item) => {
    if (item && item.length > 0) {
      searchQuery[field] = {
        [queryOperator]: item,
      };
    }
  };

  addToSearchQuery('$text', '$search', query.text && `\"${query.text}\"`);
  addToSearchQuery('experience', '$in', query.experienceLevels);
  addToSearchQuery('location', '$in', query.locations);
  addToSearchQuery('role', '$in', query.roles);
  addToSearchQuery('skills', '$in', query.skills);

  if (query.text) {
    // If we do a full-text search, then we want to order the results by decreasing text score
    // and also filter out the results to only show relevent searches by matching on a text
    // score that is >= 1
    return JobListing.aggregate([
      {
        $match: searchQuery,
      },
      {
        $project: {
          _id: 0,
          id: 1,
          title: 1,
          experience: 1,
          location: 1,
          url: 1,
          company: 1,
          ...ORDER_BY_SCORE,
        },
      },
      {
        $match: {
          score: {
            $gte: 1,
          },
        },
      },
      {
        $sort: ORDER_BY_SCORE,
      },
    ]).exec().then(items => res.send(items));
  }
  return JobListing.find(searchQuery, function(err, items) { res.send(items); });
});

module.exports = router;
