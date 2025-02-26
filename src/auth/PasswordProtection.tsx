import React, {ReactNode, useState } from "react";

const PasswordProtection: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("authenticated") === "true"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = "VSz`xfK5*y3[6pY-X.Q;mR";

    if (password === correctPassword) {
      localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontSize: "1.2em", padding: "10px" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "20px", fontSize: "1em" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordProtection;