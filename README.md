# 1Fi Marketplace — Mutual Fund Backed EMI Platform

A modern full-stack web application built for the **1Fi SDE1 Assignment**, showcasing smartphones with flexible EMI plans backed by mutual funds (LAMF). The application faithfully mirrors the existing **1Fi app design system** (`1fi.in` & `app.1fi.in`), retrieves dynamic data via REST APIs powered by **Express.js**, **Prisma ORM**, and **PostgreSQL**, and presents a responsive user experience styled with **Tailwind CSS**.

---

## 🌟 Live Demo & Links

- **Frontend (Vercel):** [https://onefi-marketplace.vercel.app](https://onefi-marketplace.vercel.app) *(or your deployed Vercel link)*
- **Backend API (Render):** [https://onefi-marketplace-api.onrender.com](https://onefi-marketplace-api.onrender.com) *(or your deployed Render link)*
- **Demo Video (2–5 min):** *(Insert your Google Drive / YouTube link here)*

---

## 🎨 1Fi Design System Consistency

The assignment specifically requires maintaining consistency with the existing **1Fi app design**. To achieve pixel-perfect alignment, the exact tokens and component patterns were extracted directly from `1fi.in` and `app.1fi.in`:

| Design Element | 1Fi App Specification | Implementation in This Project |
| :--- | :--- | :--- |
| **Primary Purple** | `#6C28D9` / `#712CDC` | Used for active tabs, primary CTAs, accents, and links |
| **Purple Hover/Active** | `#8852e1` / `#5c22a5` | Used for interactive button hover & active states |
| **Product Card Surface** | `#EFDAFF` (Lavender) | Matches 1Fi's *Featured Products* & *Best Sellers* card surface |
| **Card Borders** | `#B3A3BF` with `border-b-[3px]` | Signature 1Fi tactile border design |
| **CTA Button Effect** | `hover:border-b-[4px]` | 3D press effect signature to 1Fi interactive buttons |
| **Typography** | `Inter` (Google Fonts) | Loaded weights 300 to 800 with tight tracking on headings |
| **Floating Navbar** | `rounded-2xl`, `backdrop-blur-md` | Floating card navbar with 1Fi purple logo mark and clean navigation |
| **Shop Tabs** | 3-tab layout with active indicator | **Top Brands**, **Nearby Stores**, and **1Fi Marketplace** (active) |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite SPA)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router DOM v7** (Dynamic client routing)
- **Axios** (API communication)
- **Lucide Icons & SVG**

### Backend
- **Node.js (v20+)**
- **Express.js 5** (RESTful API server)
- **Prisma ORM 6** (Type-safe schema, migrations, and query engine)
- **CORS & Dotenv**

### Database
- **PostgreSQL** (Cloud hosted on Neon / Render / Supabase)

---

## 📐 Architecture & Database Schema

```mermaid
erDiagram
    PRODUCT ||--o{ VARIANT : "has many"
    VARIANT ||--o{ EMI_PLAN : "has many"

    PRODUCT {
        int id PK
        string name
        string slug UK
        string brand
        string category
        string description
        float rating
        datetime createdAt
    }

    VARIANT {
        int id PK
        int productId FK
        string color
        string colorHex
        string storage
        float mrp
        float price
        float discount
        string[] images
        boolean inStock
        datetime createdAt
    }

    EMI_PLAN {
        int id PK
        int variantId FK
        int tenure
        float monthlyPayment
        float interestRate
        float totalAmount
        float downPayment
        float processingFee
        float cashback
        string cashbackLabel
        string provider
        boolean isRecommended
    }
```

### Prisma Schema (`server/prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  slug        String    @unique
  brand       String
  category    String
  description String?
  rating      Float?    @default(4.2)
  variants    Variant[]
  createdAt   DateTime  @default(now())
}

model Variant {
  id        Int       @id @default(autoincrement())
  productId Int
  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  color     String
  colorHex  String?
  storage   String
  mrp       Float
  price     Float
  discount  Float?
  images    String[]
  inStock   Boolean   @default(true)
  emiPlans  EMIPlan[]
  createdAt DateTime  @default(now())

  @@unique([productId, color, storage])
}

model EMIPlan {
  id             Int     @id @default(autoincrement())
  variantId      Int
  variant        Variant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  tenure         Int
  monthlyPayment Float
  interestRate   Float
  totalAmount    Float
  downPayment    Float?  @default(0)
  processingFee  Float?  @default(0)
  cashback       Float?
  cashbackLabel  String?
  provider       String?
  isRecommended  Boolean @default(false)
}
```

---

## 📱 Products & Seed Data Summary

The database is seeded with **3 flagship smartphones**, each with **2 to 3 variants** and **4 EMI plans per variant**:

1. **Apple iPhone 16 Pro** (`/products/apple-iphone-16-pro`)
   - **Variants:**
     - Natural Titanium (`#B0A08E`) — 256 GB (MRP: ₹1,34,900 \| Price: ₹1,31,900)
     - Black Titanium (`#3C3C3C`) — 512 GB (MRP: ₹1,57,900 \| Price: ₹1,54,900)
     - Desert Titanium (`#C4A77D`) — 256 GB (MRP: ₹1,34,900 \| Price: ₹1,31,900)
   - **EMI Plans:** 3 months (0%), 6 months (0% + ₹2,000 Cashback), 9 months (5.5%), 12 months (10.5%).

2. **Samsung Galaxy S24 Ultra** (`/products/samsung-galaxy-s24-ultra`)
   - **Variants:**
     - Titanium Gray (`#8A8A8A`) — 256 GB (MRP: ₹1,29,999 \| Price: ₹1,21,999)
     - Titanium Violet (`#A688B1`) — 512 GB (MRP: ₹1,44,999 \| Price: ₹1,36,999)
   - **EMI Plans:** 3 months (0%), 6 months (0% + ₹1,500 Cashback), 9 months (5.5%), 12 months (10.5%).

3. **OnePlus 13** (`/products/oneplus-13`)
   - **Variants:**
     - Midnight Ocean (`#1A3A5C`) — 256 GB (MRP: ₹69,999 \| Price: ₹66,999)
     - Arctic Dawn (`#E8E4DF`) — 512 GB (MRP: ₹76,999 \| Price: ₹73,999)
   - **EMI Plans:** 3 months (0%), 6 months (0% + ₹1,000 Cashback), 9 months (5.5%), 12 months (10.5%).

---

## 🔌 API Endpoints & Example Responses

### 1. Health Check
- **`GET /api/health`**
- **Response:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-09-03T13:00:00.000Z"
  }
  ```

### 2. Get All Products (Marketplace Listing)
- **`GET /api/products`**
- **Response:**
  ```json
  {
    "success": true,
    "source": "postgresql",
    "data": [
      {
        "id": 1,
        "name": "Apple iPhone 16 Pro",
        "slug": "apple-iphone-16-pro",
        "brand": "Apple",
        "category": "Smartphones",
        "description": "iPhone 16 Pro features a Grade 5 titanium design...",
        "rating": 4.5,
        "variants": [
          {
            "id": 1,
            "color": "Natural Titanium",
            "colorHex": "#B0A08E",
            "storage": "256 GB",
            "price": 131900,
            "mrp": 134900,
            "discount": 2,
            "images": [
              "/images/iphone16pro-natural-1.webp",
              "/images/iphone16pro-natural-2.webp"
            ],
            "inStock": true
          }
        ]
      }
    ]
  }
  ```

### 3. Get Product Details (by Slug or ID)
- **`GET /api/products/:slug`** or **`GET /api/products/:id`**
- **Examples:**
  - `/api/products/apple-iphone-16-pro`
  - `/api/products/samsung-galaxy-s24-ultra`
  - `/api/products/oneplus-13`
  - `/api/products/1`
- **Response:**
  ```json
  {
    "success": true,
    "source": "postgresql",
    "data": {
      "id": 1,
      "name": "Apple iPhone 16 Pro",
      "slug": "apple-iphone-16-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "description": "iPhone 16 Pro features a Grade 5 titanium design, the A18 Pro chip...",
      "rating": 4.5,
      "variants": [
        {
          "id": 1,
          "productId": 1,
          "color": "Natural Titanium",
          "colorHex": "#B0A08E",
          "storage": "256 GB",
          "mrp": 134900,
          "price": 131900,
          "discount": 2,
          "images": [
            "/images/iphone16pro-natural-1.webp",
            "/images/iphone16pro-natural-2.webp"
          ],
          "inStock": true,
          "emiPlans": [
            {
              "id": 1,
              "variantId": 1,
              "tenure": 3,
              "monthlyPayment": 43967,
              "interestRate": 0,
              "totalAmount": 131900,
              "downPayment": 0,
              "processingFee": 0,
              "cashback": null,
              "cashbackLabel": null,
              "provider": "1Fi MF Partner",
              "isRecommended": false
            },
            {
              "id": 2,
              "variantId": 1,
              "tenure": 6,
              "monthlyPayment": 21983,
              "interestRate": 0,
              "totalAmount": 131900,
              "downPayment": 0,
              "processingFee": 0,
              "cashback": 2000,
              "cashbackLabel": "₹2,000 cashback via mutual fund",
              "provider": "1Fi MF Partner",
              "isRecommended": true
            }
          ]
        }
      ]
    }
  }
  ```

---

## 🚀 Setup and Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A PostgreSQL database instance (Neon / Supabase / Render or local)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/1fi-marketplace.git
cd 1fi-marketplace
```

---

### Step 2: Configure & Run Backend Server

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit `server/.env` with your PostgreSQL database URL:
```env
DATABASE_URL="postgresql://username:password@your-host:5432/onefi_marketplace?sslmode=require"
PORT=5000
```

> **Note:** The server includes a built-in fallback dataset. If PostgreSQL is not connected yet, it will seamlessly serve the seed data and inform you in the console, so you can preview the app immediately!

#### Generate Prisma Client & Push Schema to Database:
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to PostgreSQL database
npx prisma db push

# Seed products, variants, and EMI plans into PostgreSQL
npm run seed
```

#### Start Express Server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

---

### Step 3: Configure & Run Frontend Client

Open a new terminal window:
```bash
cd client

# Install dependencies
npm install

# (Optional) Set backend URL if not using proxy
# cp .env.example .env

# Start Vite dev server
npm run dev
# Frontend will run on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Guide

### Deploy Backend to Render
1. Create a **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and set **Root Directory** to `server`.
3. Set **Build Command**: `npm install && npx prisma generate && npx prisma db push && npm run seed`
4. Set **Start Command**: `npm run start`
5. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g. from Render Postgres or Neon)
   - `PORT`: `5000`
   - `CLIENT_URL`: Your Vercel frontend URL (or `*`)

### Deploy Frontend to Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend service URL (e.g., `https://onefi-marketplace-api.onrender.com`)
5. Click **Deploy**.

---

## 🧪 Verification & Testing

- **Backend API Tests:**
  ```bash
  # In project root:
  node -e "const http = require('http'); http.get('http://localhost:5000/api/products', r => r.pipe(process.stdout));"
  ```
- **Client Production Build:**
  ```bash
  cd client
  npm run build
  ```

---

## 📂 Project Structure

```
1fi-marketplace/
├── client/                           # React frontend (Vite)
│   ├── public/
│   │   └── images/                   # Smartphone product images
│   ├── src/
│   │   ├── api/
│   │   │   └── products.js           # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # 1Fi floating navigation
│   │   │   ├── ShopTabs.jsx          # Top Brands / Nearby Stores / 1Fi Marketplace
│   │   │   ├── ProductCard.jsx       # 1Fi lavender product card (#EFDAFF)
│   │   │   ├── ProductGallery.jsx    # Image viewer with thumbnail strip
│   │   │   ├── VariantSelector.jsx   # Color swatches + storage chips
│   │   │   ├── EMIPlanCard.jsx       # Radio selectable EMI plan card
│   │   │   ├── EMIPlanList.jsx       # EMI plans list container
│   │   │   └── ProceedButton.jsx     # 1Fi press effect CTA button
│   │   ├── pages/
│   │   │   ├── ShopPage.jsx          # /shop with 3 tabs
│   │   │   └── ProductPage.jsx       # /products/:slug dynamic detail page
│   │   ├── App.jsx                   # React Router setup
│   │   ├── main.jsx
│   │   └── index.css                 # Tailwind v4 & Google Font Inter
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                           # Express backend
│   ├── prisma/
│   │   ├── schema.prisma             # PostgreSQL schema (Product, Variant, EMIPlan)
│   │   └── seed.js                   # Prisma seed script
│   ├── public/
│   │   └── images/                   # Static product images
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productController.js  # Product listing and detail resolver
│   │   ├── data/
│   │   │   └── productsData.js       # Seed and fallback dataset
│   │   ├── routes/
│   │   │   └── products.js           # /api/products router
│   │   └── index.js                  # Express app entry
│   ├── .env.example
│   └── package.json
│
└── README.md                         # Comprehensive documentation
```

---

## 👨‍💻 Author
- **Role Applied:** SDE Intern at 1Fi
- **Submission Date:** September 2026
