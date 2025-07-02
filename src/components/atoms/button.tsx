import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    router.push("/");
    router.refresh();
  };
  return (
    <Button
      className="bg-white hover:bg-gray-50 w-full font-bold cursor-pointer text-red-600 focus:text-red-600"
      onClick={handleLogOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Button>
  );
};
