const express = require('express');
const router = express.Router();
const JobListing = require('./models.js');

const ORDER_BY_SCORE = { 
  score: { 
    $meta: 'textScore',
  }
};

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
    if (item) {
      searchQuery[field] = {
        [queryOperator]: item,
      };
    }
  };

  addToSearchQuery('$text', '$search', `\"${query.text}\"`);
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

  return JobListing.find(searchQuery).exec().then(items => res.send(items));
});

module.exports = router;
