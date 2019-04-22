/* Dependencies */
var users = require('../controllers/users.server.controller.js'), 
    express = require('express'), 
    router = express.Router();
	
router.route('/')
  .get(users.profile)
  .post(users.update);
  
router.route('/algorithm')
  .get(users.algorithm);

router.route('/mentors')
  .get(users.mentors);
  
router.route('/mentees')
  .get(users.mentess);
  
router.route('/matches')
  .get(users.matches);


router.route('/make')
  .post(users.make);

  
router.route('/accept')
  .post(users.accept);
  
router.route('/rating')
  .post(users.ratings);
  
router.route('/google')
  .post(users.google);

/*
  The ':' specifies a URL parameter. 
 */
router.route('/:username')
  .get(users.loadUser);
  /*.put(users.update)
  .delete(users.delete);*/

module.exports = router;