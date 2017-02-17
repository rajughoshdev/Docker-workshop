var checkAuth = (escapeURLs) => {
	return (req, res, next) => {
		for (let i=0; i<escapeURLs.length; i++) {
			if (req.originalUrl.match(escapeURLs[i])) 
				return next();
		}
			
		if (req.user) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
}

module.exports = checkAuth;