const express = require('express');
const router = express.Router();

const JobListing = require('./models.js').JobListing;

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

router.get('/jobs', (req, res) => {
  const queryText = req.query.query;
  const searchQuery = {};

  if (queryText) {
    let query = {};

    try {
      const decodedQueryText = decodeURIComponent(queryText);
      query = JSON.parse(decodedQueryText);
    }
    catch (e) {
      return res.status(400).send({ error: e });
    }

    const searchQuery = {};
    const addToSearchQuery = (field, queryOperator, item) => {
      if (item) {
        searchQuery[field] = {
          queryOperator: item,
        };
      }
    }

    addToSearchQuery('$text', '$search', query.text);
    addToSearchQuery('experience', '$in', query.experienceLevels);
    addToSearchQuery('location', '$in', query.locations);
    addToSearchQuery('role', '$in', query.roles);
    addToSearchQuery('skills', '$in', query.skills);
  }

  JobListing
    .find(searchQuery)
    .exec().then(items => {
      return res.send(items);
    });
});

module.exports = router;
