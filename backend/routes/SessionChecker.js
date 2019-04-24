// Middleware function used to only allow logged-in users through.
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies["connect.sid"]) {
    // Allow through.
    next();
  } else {
    return res
      .status(401) // UNAUTHORIZED.
      .send("Var snäll och logga in först.");
  }
};

module.exports = sessionChecker;