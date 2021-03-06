/**
 * ProjectController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  find: function(req, res) {
    // Find a given project and return the full information including owners.
    // Look up the number of likes and whether this user liked it.
    req.proj.like = false;
    Like.countByProjectId( req.proj.id, function (err, likes) {
      req.proj.likeCount = likes;
      if (!req.user) {
        return res.send(req.proj);
      }
      Like.findOne({ where: { userId: req.user[0].id, projectId: req.proj.id }}, function (err, like) {
        if (err) { return res.send(400, { message: 'Error looking up likes.' }); }
        if (like) { req.proj.like = true; }
        return res.send(req.proj);
      });
    });
  },

  // Namespace the find() method that returns the array of objects into
  // a familiar findAll method.
  findAll: function (req, res) {
    // allow state to be set with a query parameter
    var state = req.param('state', 'public');

    function processProjects (err, projects) {
      if (err) return res.send(400, { message: 'Error looking up projects.'});
      // also include projects where you are an owner
      if (!req.user) { return res.send({ projects: projects }); }
      ProjectOwner.find({ where: { userId: req.user[0].id }}).done(function (err, myprojects) {
        if (err) return res.send(400, { message: 'Error looking up projects.'});
        var projIds = [];
        var myprojIds = [];
        // Get all of the active project IDs
        for (var i = 0; i < projects.length; i++) {
          projIds.push(projects[i].id);
        }
        // store project IDs where I'm the owner but are not in the project list
        for (var i = 0; i < myprojects.length; i++) {
          if (!(_.contains(projIds, myprojects[i].projectId))) {
            myprojIds.push(myprojects[i].projectId);
          }
        }
        if (myprojIds.length == 0) { return res.send({ projects: projects }); }
        // Get the projects that I have access to but are draft
        Project.find({ 'where': { 'id': myprojIds, 'state': 'draft' }}).done(function (err, myprojects) {
          if (err) return res.send(400, { message: 'Error looking up projects.'});
          var finalprojects = projects.concat(myprojects);
          return res.send({ projects: finalprojects });
        })
      });
    }

    // Only look up the person's projects if state is draft
    if (state === 'draft') {
      processProjects( null, [] );
    }
    else {
      Project.find({ where: { 'state': state }}).done( processProjects );
    }
  },

  create: function (req, res) {
    if (req.route.method != 'post') { return res.send(400, { message: 'Unsupported operation.' } ); }
    var proj = _.extend(req.body || {}, req.params);
    Project.create(proj, function (err, newProj) {
      if (err) { return res.send(400, { message: 'Error creating project.' } ); }
      // Associate the user that created this project with the project
      ProjectOwner.create({ projectId: newProj.id,
                            userId: req.user[0].id
                          }, function (err, projOwner) {
        if (err) { return res.send(400, { message: 'Error storing project owner.' } ); }
        newProj.owners = [ projOwner ];
        return res.send(newProj);
      });
    });
  },

  // XXX TODO: Update this function to use req.proj rather than repeating the lookup
  // update: function (req, res) {
  // }

};
