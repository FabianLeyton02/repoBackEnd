export function auth(req, res, next) {
  if (req.session.logged) {
    next();
  } else {
    res.send("Ruta restringida");
  }
}
