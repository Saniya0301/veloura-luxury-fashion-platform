import { pgTable, text, integer, boolean, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

// Products table representing luxury items
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // "dresses", "tailoring", "essentials", "accessories"
  price: integer("price").notNull(), // in ₹ (Rupees)
  description: text("description").notNull(),
  primaryImage: text("primary_image").notNull(),
  secondaryImage: text("secondary_image").notNull(),
  images: jsonb("images").$type<string[]>().notNull(), // Full gallery list
  colorVariants: jsonb("color_variants").$type<Array<{ name: string; hex: string }>>().notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(), // ["XS", "S", "M", "L", "XL"]
  details: jsonb("details").$type<string[]>().notNull(), // Bullet points
  material: text("material").notNull(),
  care: text("care").notNull(),
  rating: text("rating").default("4.8"),
  isSignature: boolean("is_signature").default(false).notNull(),
  isNew: boolean("is_new").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Newsletter subscription
export const subscribers = pgTable("subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Journal articles
export const journal = pgTable("journal", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // HTML or paragraphs
  category: text("category").notNull(), // e.g. "Philosophy", "Style Guide", "Couture"
  readTime: text("read_time").notNull(), // "4 min read"
  date: text("date").notNull(), // "October 14, 2026"
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Local session-based Wishlist (optional persistent sync)
export const wishlist = pgTable("wishlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Local session-based Cart (optional persistent sync)
export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
