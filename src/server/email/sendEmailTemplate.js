const fetch = require('node-fetch');

function sendTemplate(data) {
  fetch('https://us12.api.mailchimp.com/3.0/templates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_KEY).toString('base64')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => createCampaign(json.id));
}

function createCampaign(id) {
  const data = {
    "recipients": {
      "list_id": process.env.MAILCHIMP_LIST,
    },
    "type": "regular",
    "settings": {
      "subject_line": "New careers from opportunecareers.com",
      "reply_to":"hello@opportunecareers.com",
      "from_name":"Opportune",
      "template_id": id
    }
  }

  fetch('https://us12.api.mailchimp.com/3.0/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_KEY).toString('base64'),
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => console.log(json));
}

//sendCampaign(json.id)

/*function sendCampaign(id) {
  fetch('https://us12.api.mailchimp.com/3.0/campaigns/' + id + '/actions/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_KEY).toString('base64'),
    }
  })
}*/

module.exports = sendTemplate;
