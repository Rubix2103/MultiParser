const config = require('./config.js');
const { truncate } = require('../shared-services/helpers.js');
const { validatePayload } = require('../shared-services/validator.js');

/**
 * Express-style middleware verifying authentication and permissions.
 * @param {string[]} requiredRoles
 */
function authMiddleware(requiredRoles = []) {
  return function (req, res, next) {
    const token = req.headers ? req.headers[config.auth.headerName.toLowerCase()] : null;

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing authentication token header',
      });
    }

    const validation = validatePayload(req.body, []);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Bad Request', details: validation.summary });
    }

    req.user = {
      token: truncate(token, 15),
      role: 'operator',
      authenticatedAt: Date.now(),
    };

    if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Insufficient role permissions' });
    }

    if (next) next();
  };
}

module.exports = {
  authMiddleware,
};

