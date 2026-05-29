import { createFileRoute, redirect } from "@tanstack/react-router";
import { createArfThread, listArfThreads } from "@/lib/arf.functions";

export const Route = createFileRoute("/_authenticated/arf")({
  loader: async () => {
    const threads = await listArfThreads();
    if (threads.length > 0) {
      throw redirect({ to: "/arf/$threadId", params: { threadId: threads[0].id } });
    }
    const created = await createArfThread();
    throw redirect({ to: "/arf/$threadId", params: { threadId: created.id } });
  },
  component: () => null,
});
