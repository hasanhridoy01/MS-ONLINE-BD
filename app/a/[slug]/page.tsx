// app/a/[slug]/page.tsx

export async function generateStaticParams() {
  return [
    { slug: "support" },
    { slug: "offer" },
    { slug: "about" },
  ];
}

interface PageProps {
  params: { slug: string };
}

export default function DynamicPage({ params }: PageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-primary">
        Dynamic Page for: <span className="text-blue-500">{params.slug}</span>
      </h1>
    </main>
  );
}
