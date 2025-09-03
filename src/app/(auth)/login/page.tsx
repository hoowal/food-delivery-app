import { login } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <form>
      <Button size={"lg"} formAction={login}>
        Login
      </Button>
    </form>
  );
}
