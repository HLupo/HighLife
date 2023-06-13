import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const useDashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const signOutCallback = async () => {
    await router.push("/");
  };

  return {
    user,
    isLoaded,
    router,
    signOutCallback,
  };
};
