const next = require("next");
const session = require("express-session");
const express = require("express");
const loginController = require("./api/login");
const logoutController = require('./api/logout')
const registerController = require("./api/register")
const redirectHomecontroller = require('./api/redirectHome')
const redirectLogincontroller = require('./api/redirectLogin');
const users =require('./users.json')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const TWO_HOURS = 1000 * 60 * 60 * 2;
  const {
    PORT = 3000,
    NODE_ENV = "development",

    SESSION_NAME = "sid",
    SESS_SECRET = "ssh!quiet,it'asecret!",
    SESS_LIFFTIME = TWO_HOURS,
  } = process.env;

  const IN_PROD = NODE_ENV === "projection";

  const server = express();

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  server.use(
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
  server.use((req, res, nextProcess) => {
    //like cors
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    nextProcess();
  });
  server.use((req, res, next) => {
    const { userId } = req.session;
    if (userId) {
      res.locals.user = users.find((user) => user.id === userId);
    }
    next();
  });
  server.post("/api/login",loginController);
  server.post("/logout",redirectLogincontroller,logoutController)
  server.post("/register",redirectHomecontroller,registerController)
  server.get("*", (req, res) => handle(req, res));
  server.listen(3000, () => console.log("Server Started"));
});
