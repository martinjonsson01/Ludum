const db = require("../db");
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const getCurrentUser = (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.sendStatus(404); // NOT FOUND.
  }
};

const putCurrentUser = asyncHandler(async (req, res) => {
  /**
   * Validate JWT before allowing user access.
   */
  // Get the idToken provided by the client.
  const jwtToken = req.body.idToken;
  if (!jwtToken) return res.sendStatus(401); // UNAUTHORIZED.
  const ticket = await client.verifyIdToken({
    idToken: jwtToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // Get the hosted domain of the token.
  const tokenHostedDomain = payload["hd"];
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Get the hosted domain of the school from the database.
  const [schools] = await pool.query("SELECT hosted_domain FROM school");
  const schoolHostedDomain = schools[0].hosted_domain;
  // Check if hosted domain of token matches the hosted domain of the school.
  if (tokenHostedDomain !== schoolHostedDomain) {
    return res
      .status(401) // UNAUTHORIZED.
      .send(
        "Google-kontot är inte en del av skolans G-Suite. " +
        "Var snäll och använd ett konto som är med i skolans G-Suite."
      );
  }

  /**
   * Add user to database or update information if already there.
   */
  const { sub: userId, given_name, family_name, picture, email } = payload;
  await pool.execute(
    "INSERT INTO user (id, first_name, last_name, avatar_url, email) " +
    "VALUES (?, ?, ?, ?, ?) " +
    "ON DUPLICATE KEY " +
    "UPDATE first_name=?, last_name=?, avatar_url=?, email=?",
    [userId, given_name, family_name, picture, email,
      given_name, family_name, picture, email]
  );

  // Store payload in session.
  req.session.user = payload;

  return res
    .status(201) // CREATED.
    .send(payload);
});

const deleteCurrentUser = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.sendStatus(500); // INTERNAL SERVER ERROR.
    // Clear session cookie.
    res.clearCookie("connect.sid");
    return res.sendStatus(200); // OK.
  });
};

module.exports.getCurrentUser = getCurrentUser;
module.exports.putCurrentUser = putCurrentUser;
module.exports.deleteCurrentUser = deleteCurrentUser;