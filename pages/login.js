import { useState } from "react";
import axios from "axios";
export default function login(req, res) {
  return (
    <div>
      <form method="POST" action="/api/login">
        <input type="text" name="username" value="aaaa"></input>
        <br />
        <input type="password" name="password" value="1234235"></input>
        <br />
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
}
