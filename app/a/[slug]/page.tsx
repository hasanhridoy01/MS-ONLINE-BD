import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

interface PageData {
  id: number;
  title: string;
  content: string;
  status: number;
  slug: string;
  template: string;
}

// This tells Next.js to render on-demand
export const dynamic = "force-dynamic";

async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/page/${slug}`,
      { cache: "no-store" } // Always fetch fresh data
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.status ? result.data : null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const pageData = await getPageData(params.slug);

  if (!pageData) notFound();

  return (
    <main className="min-h-screen flex flex-col lg:mt-36 mt-52">
      <div className="container mx-auto px-4 max-w-4xl md:py-24 py-20">
        <div className="text-center mb-8">
          <h1 className="md:text-[32px] text-[24px] font-normal font-montserrat mb-2 text-primary">
            {pageData.title}
          </h1>
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
      </div>
    </main>
  );
}
