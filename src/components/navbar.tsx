import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="mx-auto w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold">catatanku</h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              {status === "authenticated" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <div className="flex items-center gap-1">
                        <p className="text-lg">{session.user.name}</p>
                        <ChevronDown />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{session.user.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <ModeToggle />
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {status === "authenticated" && (
              <div className="flex items-center rounded-md px-3 py-2 text-base font-medium">
                <span>{session.user.name}</span>
              </div>
            )}
            {status === "authenticated" && (
              <Button
                variant="ghost"
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            )}
            <div className="px-3 py-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
      <div className="w-full px-6">
        <Separator orientation="horizontal" />
      </div>
    </nav>
  );
};

export default Navbar;
