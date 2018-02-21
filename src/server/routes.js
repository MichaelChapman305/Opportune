const express = require('express');
const router = express.Router();
const JobListing = require('./models.js').JobListing;

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

  addToSearchQuery('$text', '$search', query.text);
  addToSearchQuery('experience', '$in', query.experienceLevels);
  addToSearchQuery('location', '$in', query.locations);
  addToSearchQuery('role', '$in', query.roles);
  addToSearchQuery('skills', '$in', query.skills);

  if (query.text) {
    // If we do a full-text search, then we want to order the results by decreasing text score
    return JobListing.find(searchQuery, ORDER_BY_SCORE).sort(ORDER_BY_SCORE).exec().then(items => res.send(items));
  }

  return JobListing.find(searchQuery).exec().then(items => res.send(items));
});

module.exports = router;
