import { DeleteNoteDialog } from "@/components/delete-note-dialog";
import Loading from "@/components/loading";
import { NoteModal } from "@/components/note-modal";
import SkeletonCardNote from "@/components/skeleton-card-note";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { NotepadText, Pencil, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NoteForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<{
    id: number;
    title: string;
    content: string;
    code: string;
  } | null>(null);

  const session = useSession();
  const router = useRouter();

  // if (session.status === "unauthenticated") {
  //   router.push("/login");
  // }

  const notesQuery = api.note.getAll.useQuery();

  const deleteNoteMutation = api.note.delete.useMutation({
    onSuccess: () => {
      void notesQuery.refetch();
    },
  });

  const handleOpenModal = (
    note?: {
      id: number;
      title: string;
      content: string;
    },
    code?: string,
  ) => {
    const data = {
      id: note?.id ?? 0,
      title: note?.title ?? "",
      content: note?.content ?? "",
      code: code ?? "",
    };
    setCurrentNote(data ?? null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentNote(null);
    setIsModalOpen(false);
  };

  const handleDeleteNote = (id: number) => {
    deleteNoteMutation.mutate({ id });
  };

  if (notesQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto min-h-screen w-full p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Note
        </Button>
      </header>

      <div>
        {notesQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <Fragment key={index}>
                <SkeletonCardNote />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notesQuery.data?.map((note) => (
              <Card
                key={note.id}
                className="shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="line-clamp-3">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleOpenModal(note, "view")}
                  >
                    <NotepadText className="mr-2 h-4 w-4" /> View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenModal(note, "edit")}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <DeleteNoteDialog
                    onDelete={() => handleDeleteNote(note.id)}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        note={currentNote}
        refetchNotes={notesQuery.refetch}
      />
    </div>
  );
}
