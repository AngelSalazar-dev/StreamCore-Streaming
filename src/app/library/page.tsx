"use client";

import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
const UnauthorizedNotice = dynamic(() => import("@/components/ui/notice/Unauthorized"));
const LibraryList = dynamic(() => import("@/components/sections/Library/List"));

type State = "loading" | "auth" | "guest";

const LibraryPage: NextPage = () => {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data, error }) => setState(error || !data.user ? "guest" : "auth"));
  }, []);

  if (state === "loading") return null;

  return (
    <div>
      {state === "auth" ? (
        <LibraryList />
      ) : (
        <UnauthorizedNotice
          title="Sign in to access your library"
          description="Create a free account to save your favorite movies and TV shows!"
        />
      )}
    </div>
  );
};

export default LibraryPage;
