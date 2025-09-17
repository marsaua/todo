"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const res = await fetch(`${API_URL}/auth/google-authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      if (!res.ok) {
        throw new Error("Google auth failed");
      }

      const data = await res.json();
      router.push("/home");
      console.log("✅ Auth success:", data);
    } catch (error) {
      console.error("❌ Auth error:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };
  return (
    <GoogleOAuthProvider clientId="927952491482-4ult2n497ik8h9kpeekabijtdgsf2h0m.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}
