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
        <div className={styles.toggleText} onClick={() => setIsSignUp(!isSignUp)}>
  {isSignUp ? (
    <>
      Don't have an account? <span className={styles.highlight}>Sign up</span> instead.
    </>
  ) : (
    <>
      Already have an account? <span className={styles.highlight}>Sign in</span> instead.
    </>
  )}
</div>


     
        <div className={styles.terms}>
          By signing up, you agree to the{" "}
          <a href="/terms" className={styles.link}>Terms of Service</a> and{" "}
          <a href="/privacy" className={styles.link}>Privacy Policy</a>.
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
