import Loading from "@/components/loading";
import NoteForm from "@/components/note-form";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import BG from "../../public/bg.png";

export default function HomePage() {
  const session = useSession();

  if (session.status === "loading") return <Loading />;

  if (session.status === "unauthenticated") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-12 p-8 md:flex-row lg:min-h-[80vh]">
        <motion.div
          className="flex max-w-2xl flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-center text-5xl font-extrabold leading-tight md:text-7xl">
            Catatanku
          </h1>
          <p className="mb-8 text-center text-xl leading-relaxed md:text-2xl">
            {`"Kelola catatanmu dengan mudah, kapan saja, di mana saja. Sederhana,
            cepat, dan aman."`}
          </p>
          <p className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Mulai Sekarang
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="default"
                className="transform rounded-full px-8 py-4 text-lg transition-all duration-300 ease-in-out hover:scale-105"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="transform rounded-full border-2 px-8 py-4 text-lg transition-all duration-300 ease-in-out hover:scale-105"
              >
                Register
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-full max-w-2xl overflow-hidden rounded-2xl border-2 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src={BG}
            alt="Background Image"
            layout="responsive"
            className="object-cover"
          />
        </motion.div>
      </div>
    );
  }

  return <NoteForm />;
}
