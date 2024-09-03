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
    <div className={styles.container2}>

    <div className={styles.container}>

      <div className={styles.left}>
        <h1 className={styles.leftText}>Welcome to Airnesy</h1>
      </div>
      <div className={styles.right}>
        <h2 className={styles.rightText}>{isSignUp ? "Sign in" : "Sign up"}</h2>
        <div
          className={styles.socialButton}
          onClick={() => signIn("google")}
        >
          <img
            src="/google.png"
            alt="Google Logo"
            style={{ width: "20px", height: "20px" }}
          />
          {isSignUp ? "Sign in with Google" : "Sign up with Google"}
        </div>
        <div
          className={styles.toggleText}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Don't have an account? Sign up instead."
            : "Already have an account? Sign in instead."}
        </div>
      </div>
      </div>

    </div>
  );
};

export default LoginPage;
  

  
