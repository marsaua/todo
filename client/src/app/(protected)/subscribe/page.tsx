"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRedeemInvitationMutation } from "@/entities/invitation/query";
import { ApiError } from "@/helpers/fetchWithAuth";
import { useNotification } from "@/context/NotificationContext";

export default function SubscribePage() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") ?? "";

  const { mutateAsync } = useRedeemInvitationMutation();
  const { showSuccess, showError } = useNotification();

  // щоб не викликати повторно в StrictMode / при ре-рендерах
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (!token) {
      router.replace("/home");
      return;
    }

    (async () => {
      try {
        await mutateAsync(token);
        showSuccess("Invitation redeemed successfully");
        router.replace("/home");
      } catch (err) {
        if (err instanceof ApiError) {
          // точніші переходи за статусами бекенду
          switch (err.status) {
            case 401:
              showError("This invitation is for another account");

              // router.replace(
              //   `/login?next=${encodeURIComponent(`/subscribe?token=${token}`)}`
              // );
              return;
            case 403:
              showError("This invitation is for another account");
              // router.replace("/not-authorized");
              return;
            case 409:
              showError("This invitation has already been used");
              // router.replace("/invite-used");
              return;
            case 410:
              showError("This invitation has expired");
              // router.replace("/invite-expired");
              return;
            case 400:
            default:
              showError("Invalid invitation");
              // router.replace("/invite-invalid");
              return;
          }
        }

        // мережеві/інші помилки
        showError("Network error");
        router.replace("/invite-invalid");
      }
    })();
  }, [token, mutateAsync, router, showError, showSuccess]);

  return null; // можна показати спінер, якщо хочеш
}
