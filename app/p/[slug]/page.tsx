import { notFound } from "next/navigation";
import DynamicContext from "../components/DynamicContext";

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
      { cache: "no-store" }
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
    <div className="min-h-screen flex flex-col lg:mt-36 mt-52">
      <DynamicContext title={pageData?.title} content={pageData?.content} />
    </div>
  );
}
