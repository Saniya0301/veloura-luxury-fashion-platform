import { getProducts, getJournalEntries, ensureDatabaseSeeded } from "@/db/queries";
import HomeContainer from "@/components/HomeContainer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Ensure database has premium seeded products & stories on startup
  await ensureDatabaseSeeded();

  // Query high-fidelity data from PostgreSQL in parallel on the server
  const [productsList, journalEntries] = await Promise.all([
    getProducts(),
    getJournalEntries()
  ]);

  // Pass loaded records down into the client container for responsive interaction
  return (
    <HomeContainer 
      initialProducts={productsList} 
      initialArticles={journalEntries} 
    />
  );
}
