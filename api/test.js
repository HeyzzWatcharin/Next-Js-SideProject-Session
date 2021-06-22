const express = require("express");
// const bodyParser = require("body-parser");
const session = require("express-session");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3000,
  NODE_ENV = "development",

  SESSION_NAME = "sid",
  SESS_SECRET = "ssh!quiet,it'asecret!",
  SESS_LIFFTIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "projection";

// TODO DB
const users = [
  { id: 1, name: "Alex", email: "alex@gmail.com", password: "secret" },
  { id: 2, name: "Max", email: "Max@gmail.com", password: "secret" },
  { id: 3, name: "Hagrad", email: "Hagrad@gmail.com", password: "secret" },
];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFFTIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    //console.log("redirectlogin");
    res.redirect("/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    //console.log("redirectHome");
    console.log("Come redirectHome ");
    res.redirect("/home"); // Error
  } else {
    next();
  }
};

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals.user = users.find((user) => user.id === userId);
  }
  next();
});

app.get("/", (req, res) => {
  console.log(req.session);
  res.send(
            `
            <h1>Welcome!</h1>
            <ul>
                <li><a href='/home'>Home</a> </li>
                <li><a href='/login'>Login</a> </li>
                <li><a href='/register'>Register</a></li>
            </ul> 
            `
  );
});

app.get("/home",redirectLogin, (req, res) => {
  //   const { user } = res.locals;
  const { userId } = req.session;
  const user = users.find((result) => {
    return result.id === userId;
  });
  console.log("It is userID Na kub ----> ", user.id);
  //console.log(req.session.userId);
  console.log(req.session);
  res.send(`
        <h1>Home</h1>
        <ul>
            <li>Name: ${user.name} </li>
            <li>Email: ${user.email} </li>
        </ul>
        <form method='post' action='/logout'><button>Logout</button></form>
    `);
});

app.get("/login", redirectHome, (req, res) => {
  console.log("-------------");
  console.log(req.session);
  console.log("Hello login");
  res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
        <input type='email' name='email' placeholder='Email' value="Max@gmail.com" required />
        <input type='password' name='password' placeholder='Password' value="secret" required />
        <input type='submit' />
    </form>
    <a href='/register'>Register</a>
    `);
});

app.get("/register", redirectHome, (req, res) => {
  console.log("-------------");
  console.log(req.session);
  console.log("Hello register");
  res.send(`
    <h1>Register</h1>
    <form method='post' action='/register'>
        <input type='name' id='name' name='name' placeholder='Name' required />
        <input type='email' id='email' name='email' placeholder='Email' required />
        <input type='password' id='password' name='password' placeholder='Password' required />
        <input type='submit' />
    </form>
    <a href='/login'>Login</a>
    `);
});

app.post("/login", redirectHome, (req, res) => {
  console.log("Come To Path Login .post");
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      (user) => user.email === email && user.password === password //TODO: Hash
    );
    console.log("User Coming ---> ", user);
    if (user) {
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }

  res.redirect("/login");
});

app.post("/register", redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  // TODO Validation
  if (name && email && password) {
    const exists = users.some((user) => user.email === email);
    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password, //TODO hash
      };

      users.push(user);
      req.session.userId = user.id;
      return res.redirect("/home");
    }
  }
  // TODO qs /register?error=error.auth.emailTopShort
  res.redirect("/register"); //TODO qs errors
});

app.post("/logout", redirectLogin, (req, res) => {
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
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
