const express = require('express');
const request = require('superagent');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('../shared/routes.js');
const JobListing = require('./models.js');

const router = express.Router();
router.use(bodyParser.json());

const ORDER_BY_SCORE = {
  score: {
    $meta: 'textScore',
  }
};

const ORDER_BY_COMPANY_ASC = {
  company: 1,
};

router.post(routes.SUBSCRIBE_URI, (req, res) => {
  request
    .post('https://us12.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_KEY ).toString('base64'))
    .send({
      'email_address': req.body.email,
      'status': 'pending',
      'merge_fields': {
        'FNAME': req.body.firstName,
        'LNAME': req.body.lastName
      }
    })
    .end((err, response) => {
      if (response.status < 300 || (response.status === 400 && response.body.title === 'Member Exists')) {
        res.send('Signed Up!');
      } else {
        res.send(response.body.title);
      }
    });
});

router.get(routes.HOME_URI, (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

router.get(routes.JOBS_URI, (req, res) => {
  const queryText = req.query.query;

  if (!queryText) {
    return JobListing
      .find({})
      .sort(ORDER_BY_COMPANY_ASC)
      .exec()
      .then(items => res.send(items));
  }

  let query = {};

  try {
    query = JSON.parse(decodeURIComponent(queryText));
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

  // We need to be able to find all variations of a particular location.
  // For example, if someone adds a "New York, NY" token we should also
  // find entries such as NYC, New York City, NY - HQ, etc so we can
  // build several regexes for every location to properly filter entries
  if (query.locations.length > 0) {
    query.locations = buildLocationRegexes(query.locations);
  }

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
    ]).sort(ORDER_BY_COMPANY_ASC).exec().then(items => res.send(items));
  }

  return JobListing
    .find(searchQuery)
    .sort(ORDER_BY_COMPANY_ASC)
    .exec()
    .then(items => res.send(items));
});

function buildLocationRegexes(locations) {
  const locationRegexes = [];

  for (let i = 0, len = locations.length; i < len; i++) {
    if (locations[i] === 'Washington, D.C.') {
      // Hackfix: Washington, D.C. is the only "special" location so
      // we just want to find all instances of Washington, D.C. with
      // varying punctuation
      locationRegexes.push(/Washington..?D.?C.?/);
      continue;
    }

    const location = locations[i].split(',');
    const city = location[0];

    if (location.length < 2) {
      // If there is no state (i.e. for Remote locations) then just add the
      // location as is
      locationRegexes.push(new RegExp(location, 'g'));
      continue;
    }

    locationRegexes.push(new RegExp(city, 'g'));

    if (city.indexOf(' ') !== -1) {
      // If the city is multiple words, add the abbreviation of the city
      const abbreviation = city.match(/\b(\w)/g).join('');
      locationRegexes.push(new RegExp(abbreviation, 'g'));
    }
  }

  return locationRegexes;
}

module.exports = router;
