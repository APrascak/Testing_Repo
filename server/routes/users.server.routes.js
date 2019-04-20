/* Dependencies */
var users = require('../controllers/users.server.controller.js'), 
    express = require('express'), 
    router = express.Router();
	
router.route('/')
  .get(users.profile)
  .post(users.update);
  
router.route('/google')
  .post(users.google);

/*
  The ':' specifies a URL parameter. 
 */
/*router.route('/:listingId')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);


router.param('listingId', users.listingByID);*/

module.exports = router;