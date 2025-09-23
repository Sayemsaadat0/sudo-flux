import HomePageContainer from "@/components/home-page/HomePageContainer";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default async function Home() {
  const baseUrl = getBaseUrl();

  // Reusable safe fetch wrapper
  const safeFetch = async <T,>(url: string, fallback: T): Promise<T> => {
    try {
      const res = await fetch(url, { cache: "no-store" });

      // Handle 404 / error response gracefully
      if (!res.ok) {
        console.error(`❌ Fetch failed: ${url} → ${res.status}`);
        return fallback;
      }

      const data = await res.json().catch(() => null);
      if (!data) return fallback;

      // Handle different API response structures
      if (data.results) {
        return data.results as T;
      } else if (data.data?.result) {
        return data.data.result as T;
      } else if (Array.isArray(data)) {
        return data as T;
      }
      
      return fallback;
    } catch (err) {
      console.error(`❌ Network/parse error at ${url}:`, err);
      return fallback;
    }
  };

  // Run requests in parallel with fallbacks
  const [industries, faqs] = await Promise.all([
    safeFetch(`${baseUrl}/api/industries?per_page=100`, []),
    safeFetch(`${baseUrl}/api/faq?per_page=10&category=general&publish=true`, []),
  ]);

  return (
    <HomePageContainer
      industries={industries}
      // blogs={blogs}
      faqs={faqs}
    />
  );
}
