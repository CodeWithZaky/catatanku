"use client";

import { DeleteNoteDialog } from "@/components/delete-note-dialog";
import { NoteModal } from "@/components/note-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  const notesQuery = api.note.getAll.useQuery();

  const deleteNoteMutation = api.note.delete.useMutation({
    onSuccess: () => {
      notesQuery.refetch();
    },
  });

  const handleOpenModal = (note?: {
    id: number;
    title: string;
    content: string;
  }) => {
    setCurrentNote(note || null);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto min-h-screen w-full p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Note
        </Button>
      </header>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        {notesQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </CardFooter>
              </Card>
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
                  <p className="line-clamp-3">{note.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenModal(note)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  {/* <Button
                    variant="destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="mr-2 w-4 h-4" /> Delete
                  </Button> */}
                  <DeleteNoteDialog
                    onDelete={() => handleDeleteNote(note.id)}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        note={currentNote}
        refetchNotes={notesQuery.refetch}
      />
    </div>
  );
}
