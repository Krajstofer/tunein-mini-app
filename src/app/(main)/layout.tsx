import AudioPlayer from "@/components/AudioPlayer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl bg-neutral-950 px-4 sm:px-6 lg:px-8">
      <header className="my-4 py-4">
        <h1 className="border-b border-neutral-700 py-4 text-5xl font-bold">
          📻 TuneIn mini
        </h1>
      </header>
      <div>{children}</div>
      <div className="fixed bottom-0 left-0 right-0 z-10 m-auto max-w-7xl px-4 py-8">
        {/* TODO AudioPlayer */}
        <AudioPlayer />
      </div>
    </div>
  );
}
