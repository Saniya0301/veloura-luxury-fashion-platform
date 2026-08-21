import { db } from "@/db";
import { products, journal, subscribers } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { SEED_PRODUCTS, SEED_JOURNAL } from "./products-data";

// Seed the database if empty
export async function ensureDatabaseSeeded() {
  try {
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length === 0) {
      console.log("Database is empty. Seeding luxury products...");
      
      // Seed products
      for (const p of SEED_PRODUCTS) {
        await db.insert(products).values({
          name: p.name,
          slug: p.slug,
          category: p.category,
          price: p.price,
          description: p.description,
          primaryImage: p.primaryImage,
          secondaryImage: p.secondaryImage,
          images: p.images,
          colorVariants: p.colorVariants,
          sizes: p.sizes,
          details: p.details,
          material: p.material,
          care: p.care,
          rating: p.rating,
          isSignature: p.isSignature,
          isNew: p.isNew,
        });
      }
      
      // Seed journal articles
      for (const j of SEED_JOURNAL) {
        await db.insert(journal).values({
          title: j.title,
          slug: j.slug,
          excerpt: j.excerpt,
          content: j.content,
          category: j.category,
          readTime: j.readTime,
          date: j.date,
          image: j.image,
        });
      }
      console.log("Database successfully seeded with premium assets!");
    }
  } catch (error) {
    console.error("Failed to seed database automatically:", error);
  }
}

// Get all products with filters
export async function getProducts(options?: {
  category?: string;
  sortBy?: string;
  search?: string;
  isSignature?: boolean;
  isNew?: boolean;
}) {
  await ensureDatabaseSeeded();
  
  try {
    const allProducts = await db.select().from(products);
    let filtered = [...allProducts];
    
    // Category filter
    if (options?.category && options.category !== "all") {
      const targetCat = options.category.toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === targetCat);
    }
    
    // isSignature filter
    if (options?.isSignature !== undefined) {
      filtered = filtered.filter(p => p.isSignature === options.isSignature);
    }
    
    // isNew filter
    if (options?.isNew !== undefined) {
      filtered = filtered.filter(p => p.isNew === options.isNew);
    }
    
    // Search query
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sorting
    if (options?.sortBy) {
      if (options.sortBy === "newest") {
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      } else if (options.sortBy === "price_asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (options.sortBy === "price_desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else {
        // default/featured: sort signature first, then new
        filtered.sort((a, b) => {
          if (a.isSignature !== b.isSignature) {
            return a.isSignature ? -1 : 1;
          }
          if (a.isNew !== b.isNew) {
            return a.isNew ? -1 : 1;
          }
          return b.price - a.price;
        });
      }
    } else {
      // Default featured
      filtered.sort((a, b) => {
        if (a.isSignature !== b.isSignature) {
          return a.isSignature ? -1 : 1;
        }
        return b.price - a.price;
      });
    }
    
    return filtered;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get a single product by slug
export async function getProductBySlug(slug: string) {
  await ensureDatabaseSeeded();
  try {
    const results = await db.select().from(products).where(eq(products.slug, slug));
    return results[0] || null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

// Get all journal entries
export async function getJournalEntries() {
  await ensureDatabaseSeeded();
  try {
    return await db.select().from(journal).orderBy(desc(journal.createdAt));
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
}

// Get single journal entry by slug
export async function getJournalEntryBySlug(slug: string) {
  await ensureDatabaseSeeded();
  try {
    const results = await db.select().from(journal).where(eq(journal.slug, slug));
    return results[0] || null;
  } catch (error) {
    console.error(`Error fetching journal entry by slug ${slug}:`, error);
    return null;
  }
}

// Subscribe to newsletter
export async function addSubscriber(email: string) {
  try {
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
    return { success: true, message: "Thank you for joining the Veloura letter." };
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
