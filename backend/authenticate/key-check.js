const jwt = require('jsonwebtoken');
const config=require('../config');
// this method is a middle ware to check key of authenticated client. if key not exist or key is invalid return 403 status code
function keyCheck(req, res, next) {
  const key = req.headers['x-access-token'];
  if (!key)
    return res.status(403).send({ auth: false, message: 'no key received!' });

  jwt.verify(key, config.secretKey, function(err, id) {
    if (err)
      return res.status(403).send({ auth: false, message: 'Failed becuse of error!' });
    req.userId = id.id;
    next();
  });
}
module.exports = keyCheck;
