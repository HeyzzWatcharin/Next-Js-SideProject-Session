const logout = (req,res) => {
    new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            reject(err);
          }
    
          res.clearCookie(SESSION_NAME);
          res.redirect("/");
          resolve();
        });
      });
}

module.exports = logout