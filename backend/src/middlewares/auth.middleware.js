const requireAdmin = (req, res, next) => {
  if (req.session && req.session.usuario && req.session.usuario.es_admin) {
    return next();
  }

  if (req.accepts('json') && !req.accepts('html')) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  res.redirect('/admin/login');
};

export { requireAdmin };
