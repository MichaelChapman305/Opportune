const fetch = require('node-fetch');

const EMAIL_SUBJECT = 'New careers from opportunecareers.com';
const EMAIL_FROM = 'Opportune Careers';
const EMAIL_REPLY_TO = 'chapmanm305@gmail.com';

const TEMPLATE_NAME = EMAIL_SUBJECT;
const TEMPLATE_HTML = listingsMarkup =>
  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta charset="UTF-8"><title>New weekly job listings</title></head><body style="height:100%; margin:0; padding:0; width:100%; background-color:#FAFAFA"><center><table><tr><td align="center" valign="top" id="bodyCell" style="height:100%; margin:0; padding:0; width:100%; padding:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width:600px"><tr><td valign="top" id="templatePreheader" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:left;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr><td valign="top"><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:384px; border-collapse:collapse;" width="100%" class="columnContainer"><tr><td valign="top"><div mc:edit="preheader_leftcol_content"><p>New career listings from Opportune Careers.</p></div></td></tr></table><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:180px; border-collapse:collapse;" width="100%" class="columnContainer"><tr><td valign="top"><div mc:edit="preheader_rightcol_content"><p><a style="color:#656565; font-weight:normal; text-decoration:underline;" href="*|ARCHIVE|*" target="_blank">View email in your browser</a></p></div></td></tr></table></td></tr></table></td></tr><tr><td valign="top" id="templateHeader" style="background-color:#FFFFFF; background-repeat:no-repeat; background-position:center; background-size:cover; border-top:0; border-bottom:0; padding-top:18px;"></td></tr><tr><td valign="top" id="templateBody" style="background-color:#FFFFFF; background-image:none; background-repeat:no-repeat; padding-left:1em; padding-right: .5em;background-position:center; background-size:cover; border-top:0; border-bottom:2px solid #EAEAEA; padding-bottom:9px;"><div mc:edit="body_content" style="color:#656565; font-family:Helvetica; font-size:15px; line-height:150%;"><h2 style="display:block; color:#484848; font-family:Helvetica; font-size:32px; font-style:normal; font-weight:bold; line-height:150%; letter-spacing:normal; text-align:left; margin:0; margin-top:10px; padding:0;">Check out these new jobs!</h2>At <a style="color: #8977F8; text-decoration: none;" href="https://opportunecareers.com" target="_blank">Opportune</a>, we strive to make finding the perfect software engineering career seamless and simple.${listingsMarkup}</td></tr><tr><td valign="top" id="templateFooter" style="background-color:#FAFAFA; background-image:none; background-repeat:no-repeat; background-position:center; background-size:cover; padding-top:36px; padding-bottom:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr><td valign="top" id="socialBar" style="background-color:#333333; border:0; padding:18px;"><div mc:edit="social_bar" style="text-align: center;"><a href="*|FORWARD|*" class="utilityLink" style="color:#FFFFFF; font-family:Helvetica; font-size:13px; line-height:150%;  font-weight:normal; text-decoration:none;">Forward to a Friend</a></div></td></tr><tr><td valign="top" id="footerContent" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;"><div mc:edit="footer_content"><br><br><strong>Contact us at:</strong><br><a href="hello@opportunecareers.com" style="color:#8977F8; text-decoration:none;">hello@opportunecareers.com</a><br></div></td></tr><tr><td valign="top" id="utilityBar"><div mc:edit="utility_bar" style="background-color:#FAFAFA; border:0; padding-top:9px; padding-bottom:9px; text-align:center;"><a  href="*|UNSUB|*" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">unsubscribe from this list</a><span class="mobileHide"> | </span><a href="*|UPDATE_PROFILE|*" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">update subscription preferences</a><span class="mobileHide"> | </span><a href="hello@opportunecareers.com" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">view email in browser</a><p style="align: center;">*|LIST:DESCRIPTION|*</p></div></td></tr></table></td></tr></table></td></tr></table></center></body></html>`;

const MAILCHIMP_HEADER = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Basic ${Buffer.from(`any:${process.env.MAILCHIMP_KEY}`).toString('base64')}`,
};

function uploadTemplate(template) {
  return fetch('https://us12.api.mailchimp.com/3.0/templates', {
    method: 'POST',
    headers: MAILCHIMP_HEADER,
    body: JSON.stringify(template),
  }).then(res => res.json());
}

function createEmailCampaign(templateId) {
  const data = {
    recipients: {
      list_id: process.env.MAILCHIMP_LIST,
    },
    type: 'regular',
    settings: {
      subject_line: EMAIL_SUBJECT,
      reply_to: EMAIL_REPLY_TO,
      from_name: EMAIL_FROM,
      template_id: templateId,
    },
  };

  return fetch('https://us12.api.mailchimp.com/3.0/campaigns', {
    method: 'POST',
    headers: MAILCHIMP_HEADER,
    body: JSON.stringify(data),
  }).then(res => res.json());
}

function sendEmailCampaign(campaignId) {
  fetch(`https://us12.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`, {
    method: 'POST',
    headers: MAILCHIMP_HEADER,
  });
}

function sendEmailToUsers(jobs) {
  const removeDuplicates = arr => Array.from(new Set(arr));
  const companies = removeDuplicates(jobs.map(job => job.company));
  const jobsByCompany = companies.map(company => jobs.filter(job => company === job.company));

  let listingsMarkup = '';

  for (let i = 0, len = jobsByCompany.length; i < len; i++) {
    const grouping = jobsByCompany[i];

    // prettier-ignore
    const companyMarkup =
      `<h2 style="color:#484848; font-size:17px; margin-bottom: 4px;">${grouping[0].company}</h2>`;

    // prettier-ignore
    const jobMarkup = grouping.map(job => `
      <li style="width:85%;">
        <a style="color:#437ac6; text-decoration:none;" href=${job.url}> ${job.title}</a> · ${job.location}
      </li>
    `).join('');

    listingsMarkup += `${companyMarkup}<ul style="list-style-type:none; margin:0; padding:0;">${jobMarkup}</ul>`;
  }

  return uploadTemplate({
    name: TEMPLATE_NAME,
    html: TEMPLATE_HTML(listingsMarkup),
  }).then(json => createEmailCampaign(json.id))
    .then(json => sendEmailCampaign(json.id));
}

module.exports = sendEmailToUsers;
