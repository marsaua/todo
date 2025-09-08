"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRedeemInvitationMutation } from "@/entities/invitation/query";
import { ApiError } from "@/helpers/fetchWithAuth";

export default function SubscribePage() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") || "";

  const redeemInvitationMutation = useRedeemInvitationMutation();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    if (!token) {
      router.replace("/home");
      return;
    }

    redeemInvitationMutation.mutateAsync(token, {
      onSuccess: () => {
        showSuccess("Invitation redeemed successfully");
        router.replace("/home");
      },
      onError: (error: unknown) => {
        if (error instanceof ApiError && error.status === 401) {
          router.replace(
            `/login?next=${encodeURIComponent(`/subscribe?token=${token}`)}`
          );
          return;
        }
        showError("Invalid invitation");
        router.replace("/invite-invalid");
      },
    });
  }, [token, router, redeemInvitationMutation, showError, showSuccess]);

  return null;
}
