import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotepadText, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";

export function NoNotesFound({
  handleOpenModal,
}: {
  handleOpenModal: () => void;
}) {
  return (
    <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold">
          <NotepadText className="h-8 w-8" />
          No Notes Found
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-gray-600">
        <p className="mb-4 text-lg">
          {`You don't have any notes yet. Click the button below to create a new one!`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleOpenModal}>
          <PlusCircle className="mr-2 h-5 w-5" /> Create New Note
        </Button>
      </CardFooter>
    </Card>
  );
}
