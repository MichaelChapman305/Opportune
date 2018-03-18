const sendEmailCampaign = require('./sendEmailCampaign');
const JobListing = require('../models.js');

function createEmail(jobs) {
  let listings = '';

  for (let i = 0, len = jobs.length; i < len; i++) {
    listings += `<li><a href=${jobs[i].url}> ${jobs[i].title} at ${jobs[i].company} </a></li>`;
  }

  const EMAIL_TEMPLATE = {
    name: 'New career listings from Opportunecareers.com',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta charset="UTF-8"><title>New weekly job listings</title></head><body style="height:100%; margin:0; padding:0; width:100%; background-color:#FAFAFA"><center><table><tr><td align="center" valign="top" id="bodyCell" style="height:100%; margin:0; padding:0; width:100%; padding:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width:600px"><tr><td valign="top" id="templatePreheader" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:left;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr><td valign="top"><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:384px; border-collapse:collapse;" width="100%" class="columnContainer"><tr><td valign="top"><div mc:edit="preheader_leftcol_content"><p>New weekly career listings at Opportunecareers.com.</p></div></td></tr></table><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:180px; border-collapse:collapse;" width="100%" class="columnContainer"><tr><td valign="top"><div mc:edit="preheader_rightcol_content"><p><a style="color:#656565; font-weight:normal; text-decoration:underline;" href="*|ARCHIVE|*" target="_blank">View email in your browser</a></p></div></td></tr></table></td></tr></table></td></tr><tr><td valign="top" id="templateHeader" style="background-color:#FFFFFF; background-repeat:no-repeat; background-position:center; background-size:cover; border-top:0; border-bottom:0; padding-top:18px;"><img src="https://gallery.mailchimp.com/7f1756795fb73c55e22004738/images/c9f117e3-650e-4c63-905a-c4171280e87b.png" style="padding-left:1em; max-width:564px; border:0; height:auto; outline:none; text-decoration:none;" class="templateImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner="" mc:allowtext="" alt="5ab9a40f-549b-4619-92c2-d7fd6e34e6b4.png"></td></tr><tr><td valign="top" id="templateBody" style="background-color:#FFFFFF; background-image:none; background-repeat:no-repeat; padding-left:1em; padding-right: .5em;background-position:center; background-size:cover; border-top:0; border-bottom:2px solid #EAEAEA; padding-bottom:9px;"><div mc:edit="body_content" style="color:#656565; font-family:Helvetica; font-size:15px; line-height:150%;"><h2 style="display:block; color:#222222; font-family:Helvetica; font-size:28px; font-style:normal; font-weight:bold; line-height:150%; letter-spacing:normal; text-align:left; margin:0; margin-top:10px; padding:0;">Check out our newest career listings!</h2><ul>${listings}</ul><p style="color:#606060; font-family:Helvetica; font-size:16px; line-height:150%; text-align:left;">Our <a href="https://templates.mailchimp.com/" style="color:#237A91; font-weight:normal; text-decoration:underline;">careers website</a> is designed to make finding software engineering careers and internships easy.</p></div></td></tr><tr><td valign="top" id="templateFooter" style="background-color:#FAFAFA; background-image:none; background-repeat:no-repeat; background-position:center; background-size:cover; padding-top:36px; padding-bottom:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr><td valign="top" id="socialBar" style="background-color:#333333; border:0; padding:18px;"><div mc:edit="social_bar" style="text-align: center;"><a href="*|FORWARD|*" class="utilityLink" style="color:#FFFFFF; font-family:Helvetica; font-size:13px; line-height:150%;  font-weight:normal; text-decoration:underline">Forward to a Friend</a></div></td></tr><tr><td valign="top" id="footerContent" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;"><div mc:edit="footer_content"><br><br><strong>Contact us at:</strong><br>hello@opportunecareers.com<br></div></td></tr><tr><td valign="top" id="utilityBar"><div mc:edit="utility_bar" style="background-color:#FAFAFA; border:0; padding-top:9px; padding-bottom:9px; text-align:center;"><a  href="*|UNSUB|*" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">unsubscribe from this list</a><span class="mobileHide"> | </span><a href="*|UPDATE_PROFILE|*" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">update subscription preferences</a><span class="mobileHide"> | </span><a href="hello@opportunecareers.com" class="utilityLink" style="color:#656565; font-family:Helvetica; font-size:12px; line-height:150%; text-align:center;">view email in browser</a><p style="align: center;">*|LIST:DESCRIPTION|*</p></div></td></tr></table></td></tr></table></td></tr></table></center></body></html>`,
  };

  sendEmailCampaign(EMAIL_TEMPLATE);
}

function getNewJobListings() {
  return newListings = JobListing.find(
    { $where: 'this.updatedAt[0] === this.createdAt[0]' },
    { company: 1, title: 1, url: 1 }
  )
}

module.exports = {
  getNewJobListings,
  createEmail,
};
