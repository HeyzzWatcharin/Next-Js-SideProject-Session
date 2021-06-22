const users = require("../users.json");

const login = (req,res) => {
  console.log("---------------------");
  console.log("Welcome To Api Login");
  console.log("---------------------");
  console.log("This User ------> ",users);
  const { username, password } = req.body;
  if (username && password) {
    const user = users.find(
      (user) => user.username === username && user.password === password //TODO: Hash
    );
    console.log("User Coming ---> ", user);
    if (user) {
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }

  return res.redirect("/");
  
}

module.exports = login;