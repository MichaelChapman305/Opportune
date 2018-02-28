const LEVER_COMPANIES = {
  addepar: 'Addepar',
  blendlabs: 'Blend Labs',
  buildzoom: 'BuildZoom',
  yelp: 'Yelp',
  duolingo: 'Duolingo',
  netflix: 'Netflix',
  reddit: 'Reddit',
  plaid: 'Plaid',
  essential: 'Essential Products',
  lyft: 'Lyft',
  twitch: 'Twitch',
  nurx: 'Nurx',
  area1security: 'Area 1 Security',
  skillshare: 'Skillshare',
  medium: 'Medium',
  socialtables: 'Social Tables',
  nava: 'Nava',
  vineti: 'Vineti',
  kensho: 'Kensho',
  upside: 'Upside Travels',
  crunchbase: 'Crunchbase',
  etsy: 'Etsy',
  codecademy: 'Codecademy',
  curiositymedia: 'Curiosity Media',
  1776: '1776',
  neuralink: 'Neuralink',
  openai: 'OpenAI',
  opendoor: 'Opendoor',
  snowflake: 'Snowflake',
  drawbridge: 'Drawbridge',
  coursera: 'Coursera',
  shopify: 'Shopify',
  affirm: 'Affirm',
  eaze: 'Eaze',
  circle: 'Circle',
  wish: 'Wish',
  wealthfront: 'Wealthfront',
  tyro: 'Tyro',
  intercom: 'Intercom',
  convoy: 'Convoy',
  axon: 'Axon',
  'indiegogo.com': 'Indiegogo',
  stellar: 'Stellar',
  databricks: 'Databricks',
  bluelabs: 'Blue Labs',
  shift: 'Shift',
  quora: 'Quora',
  algolia: 'Algolia',
  karat: 'Karat',
  kraken: 'Kraken Exchange',
  houzz: 'Houzz',
  palantir: 'Palantir',
  gigster: 'Gigster',
  livongo: 'Livongo',
  medallia: 'Medallia',
  plangrid: 'Plangrid',
  accompany: 'Accompany',
  confluent: 'Confluent',
  eventbrite: 'Eventbrite',
  udemy: 'Udemy',
  quantcast: 'Quantcast',
  shapesecurity: 'Shape Security',
  zumper: 'Zumper',
};

const GREENHOUSE_COMPANIES = {
  yext: 'Yext',
  appian: 'Appian',
  airbnb: 'Airbnb',
  nextdoor: 'Nextdoor',
  b12: 'B12',
  breadfinance: 'Bread Finance',
  coinbase: 'Coinbase',
  segment: 'Segment',
  comprehend: 'Comprehend',
  match: 'Match.com',
  asana: 'Asana',
  squarespace: 'Squarespace',
  trialspark: 'Trialspark',
  leanplum: 'Leanplum',
  fivestars: 'Fivestars',
  connectedfitness: 'MyFitnessPal',
  brave: 'Brave',
  nuna: 'Nuna Health',
  dropbox: 'Dropbox',
  braintree: 'Braintree',
  bluebeam: 'Bluebeam',
  datadog: 'Datadog',
  boxinc: 'Box',
  memsql: 'Memsql',
  betterment: 'Betterment',
  jumptrading: 'Jump Trading',
  akunacapital: 'Akuna Capital',
  buzzfeed: 'Buzzfeed',
  joinhandshake: 'Handshake',
  aqr: 'AQR Capital',
  fin: 'Fin',
  helix: 'Helix',
  drw: 'DRW Holdings',
  edx: 'Edx',
  casper: 'Casper',
  slack: 'Slack',
  stripe: 'Stripe',
  pinterest: 'Pinterest',
  mckinsey: 'Mckinsey & Company',
  khanacademy: 'Khan Academy',
  mealpal: 'Mealpal',
  classy: 'Classy',
  stitchfix: 'Stitchfix',
  hyperlooptechnologies: 'Hyperloop One',
  digitalocean98: 'DigitalOcean',
  mark43: 'Mark43',
  endurance: 'Endurance',
  vaticlabs: 'Vatic Labs',
  foursquare26: 'Foursquare',
  percolate: 'Percolate',
  urbancompass: 'Compass',
  doordash: 'Doordash',
  quorum: 'Quorum Analytics',
  towerresearchcapital: 'Tower Research Capital',
  fitbit92: 'Fitbit',
  peak6: 'PEAK6',
  enigmaio: 'Enigma',
  nerdwallet: 'NerdWallet',
  better: 'Better',
  spring: 'Spring',
  oscar: 'Oscar Health',
  tumblr: 'Tumblr',
  quizlet: 'Quizlet',
  classpass: 'Classpass',
  cadre: 'Cadre',
  mongoDB: 'MongoDB',
  flatironhealth: 'Flatiron Health',
  commonbond: 'Commonbond',
  knotch: 'Knotch',
  warbyparker: 'Warby Parker',
  uptake: 'Uptake',
  sumologic: 'Sumo Logic',
  purestorage: 'Pure Storage',
  chanzuckerberginitiative: 'Chan Zuckerberg Initiative',
  tripadvisor: 'TripAdvisor',
  twilio: 'Twilio',
  everwise: 'Everwise',
  thumbtack: 'Thumbtack',
  imoim: 'imo.im',
  seatgeek: 'SeatGeek',
  udacity: 'Udacity',
  zocdoc: 'Zocdoc',
  mailchimp: 'Mailchimp',
  snapchat: 'Snap Inc.',
  tinder: 'Tinder',
  elastic: 'Elasticsearch',
  docker: 'Docker',
  checkr: 'Checkr',
  sentry: 'Sentry',
  curalate: 'Curalate',
  cloudflare: 'Cloudflare',
  wehrtyou: 'Hudson River Trading',
  docusign: 'DocuSign',
  unity3d: 'Unity',
  timeinc: 'Time Inc.',
  rapid7: 'Rapid7',
  riotgames: 'Riot Games',
  qualtrics: 'Qualtrics',
  mapbox: 'Mapbox',
  instacart: 'Instacart',
  artsy: 'Artsy',
  robinhood: 'Robinhood',
  checkr: 'Checkr',
  optoro: 'Optoro',
  rubrik: 'Rubrik',
  figma: 'Figma',
  gusto: 'Gusto',
};

module.exports = {
  LEVER_COMPANIES,
  GREENHOUSE_COMPANIES,
};
