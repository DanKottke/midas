/**
* Get the project referenced in :id and check if access is allowed
*/
var util = require('../services/projectUtils')

module.exports = function projectId (req, res, next) {
  if (req.body) {
    var userId = null;
    if (req.user) {
      userId = req.user[0].id;
    }
    util.authorized(req.body.projectId, userId, function (err, proj) {
      if (err) { return res.send({ message: err }); }
      if (!err && !proj) { return res.send(403, { message: 'Not authorized.'}); }
      req.proj = proj;
      req.projectId = proj.id;
      next();
    });
  // no :id is specified, so continue
  } else {
    next();
  }
};