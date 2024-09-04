const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === 'akbar') {
    req.user = { name: 'akbar', id: 3 };
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

module.exports = authorize;