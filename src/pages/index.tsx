import NoteForm from "@/components/note-form";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return (
      <div>
        <div>login dulu</div>
      </div>
    );
  }

  return <NoteForm />;
}
