import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}