import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: { id: number; title: string; content: string; code: string } | null;
  refetchNotes: () => void;
}

export function NoteModal({
  isOpen,
  onClose,
  note,
  refetchNotes,
}: NoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const createNoteMutation = api.note.create.useMutation({
    onSuccess: () => {
      onClose();
      refetchNotes();
    },
  });

  const updateNoteMutation = api.note.update.useMutation({
    onSuccess: () => {
      onClose();
      refetchNotes();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note?.code === "edit") {
      updateNoteMutation.mutate({ id: note.id, title, content });
    } else {
      createNoteMutation.mutate({ title, content });
    }
  };

  const isLoading =
    createNoteMutation.isPending || updateNoteMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {note?.code === "view"
              ? "View Note"
              : note?.code === "edit"
                ? "Edit Note"
                : "Create Note"}
          </DialogTitle>
        </DialogHeader>
        {note?.code === "view" ? (
          <Card>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert mx-auto">
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="title"
                  className="col-span-4"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Textarea
                  id="content"
                  className="col-span-4 h-56"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {note?.code === "edit" ? "Updating..." : "Creating..."}
                  </>
                ) : note?.code === "edit" ? (
                  "Update Note"
                ) : (
                  "Create Note"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
