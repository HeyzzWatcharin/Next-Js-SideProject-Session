export default function register() {
  console.log("-------------");
  console.log(req.session);
  console.log("Hello register");
  return (
    <div>
      <h1>Register</h1>
      <form method="post" action="/register">
        <input type="name" id="name" name="name" placeholder="Name" required />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="submit" />
      </form>
      <a href="/login">Login</a>
    </div>
  );
}
