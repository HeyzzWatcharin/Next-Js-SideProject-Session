const redirectHome = (req, res, next) => {
  // console.log("This Redirect ---> ",req.body.user);
  console.log("My redirectHome API");
  if (req.session.userId) {
    //console.log("redirectHome");
    console.log("Come redirectHome ");
    res.redirect("/home"); // Error
  } else {
    next();
  }
}

module.exports = redirectHome;
