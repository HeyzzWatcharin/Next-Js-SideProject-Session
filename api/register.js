const register = (req,res) =>{
    const { name, email, password } = req.body;

  
  if (name && email && password) {
    const exists = users.some((user) => user.email === email);
    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password, 
      };

      users.push(user);
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }
  
  res.redirect("/register"); 
}

module.exports = register