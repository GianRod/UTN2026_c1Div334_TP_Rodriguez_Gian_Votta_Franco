const requireAdmin = (req, res, next) => {
  if (req.session && req.session.usuario && req.session.usuario.es_admin) {
    return next();
  }
  res.redirect('/admin/login');
};

export { requireAdmin };
