const rateLimit = require("express-rate-limit");

/**
 * Basic rate limiting to prevent abuse.
 * Allows 20 requests per hour per session.
 */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per windowMs
  message: {
    error: "Too many requests, please try again later.",
  },
  keyGenerator: (req) => {
    return req.headers["x-session-id"] || req.ip;
  },
  validate: { ip: false },
});

module.exports = limiter;
