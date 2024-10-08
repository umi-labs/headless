export default function Home() {
  return (
    <main className="flexbox vertical w-full no-padding min-h-screen font-[family-name:var(--font-geist-sans)]">
      <section className="container flexbox vertical h-screen gap-8">
        <h1 className="text-6xl font-bold">UMI UI</h1>
        <p>A headless UI library for use within the UMI Headless Stack.</p>
      </section>
      <section className="container grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl">Getting Started</h2>
          <p>To get starting using UMI UI, follow these steps:</p>
        </div>

        <div></div>
      </section>
    </main>
  );
}
