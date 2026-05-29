import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createArfThread, listArfThreads } from "@/lib/arf.functions";

export const Route = createFileRoute("/_authenticated/arf/")({
  loader: async () => {
    const threads = await listArfThreads();
    const threadId = threads[0]?.id ?? (await createArfThread()).id;
    throw redirect({ to: "/arf/$threadId", params: { threadId }, replace: true });
  },
  pendingComponent: ArfPending,
  errorComponent: ArfError,
  component: ArfPending,
});

function ArfPending() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm">Arf yükleniyor...</p>
      </div>
    </div>
  );
}

function ArfError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <p className="font-medium text-destructive">Arf açılamadı</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}
