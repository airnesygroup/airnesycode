"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Welcome to Airnesy</h1>
      </div>
      <div className={styles.right}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <div
          className={styles.socialButton}
          onClick={() => signIn("google")}
        >
          <img
            src="/google-logo.png"
            alt="Google Logo"
            style={{ width: "20px", height: "20px" }}
          />
          {isSignUp ? "Sign up with Google" : "Sign in with Google"}
        </div>
        <div
          className={styles.toggleText}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign in instead."
            : "Don't have an account? Sign up instead."}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
