"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";

export default function GoogleAuthButton() {
  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const res = await fetch(
        "http://localhost:4000/auth/google-authentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: response.credential,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Google auth failed");
      }

      const data = await res.json();
      console.log("✅ Auth success:", data);
    } catch (error) {
      console.error("❌ Auth error:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };
  return (
    <GoogleOAuthProvider clientId="900586271923-jckh7t2gerib3fliqrsalsj98dec33mr.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}
