# MR Cosmetics - E-Commerce MVP Specification

## Project Overview
- **Project Name**: MR Cosmetics Web Store
- **Type**: E-commerce website for cosmetics/skincare products
- **Core Functionality**: Complete shopping experience from product browsing to order management
- **Target Users**: Consumers looking for cosmetics and skincare products

## Technical Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (via Prisma ORM) |
| Payments | Stripe |
| Email | Resend |
| Deployment | Vercel (or AWS Amplify) |
| Analytics | Google Analytics 4 |

## UI/UX Specification

### Design System

**Color Palette**
| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Rose | #9B4A5B |
| Primary Light | Soft Rose | #D4A5A5 |
| Secondary | Warm Cream | #F5F0E8 |
| Accent | Gold | #C9A962 |
| Background | Off-White | #FEFEFA |
| Text Primary | Charcoal | #2D2D2D |
| Text Secondary | Warm Gray | #6B6B6B |
| Success | Sage Green | #5B8A6B |
| Error | Dusty Rose | #C45B5B |
| Border | Light Gray | #E5E5E5 |

**Typography**
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | Playfair Display | 32-48px | 600-700 |
| Body | Inter | 14-16px | 400 |
| Buttons | Inter | 14px | 500-600 |
| Small | Inter | 12px | 400 |

**Spacing Scale**
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Border Radius**
- Small: 4px (buttons, inputs)
- Medium: 8px (cards)
- Large: 12px (modals)

### Layout Structure

**Header**
- Logo (left)
- Navigation links: Shop, About, Contact (center)
- Cart icon with badge, User icon (right)
- Sticky on scroll
- Height: 72px desktop, 56px mobile

**Footer**
- 4-column grid: Company, Shop, Support, Legal
- Newsletter signup
- Social links
- Copyright

**Responsive Breakpoints**
| Breakpoint | Width |
|-----------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

### Pages & Components

#### Customer-Facing Pages

**1. Home/Collection Page**
- Hero banner with image and tagline
- Featured categories (grid)
- Featured products (4-8 items)
- Benefits/trust badges

**2. Product Listing Page**
- Breadcrumb navigation
- Category title
- Product grid (2-4 columns responsive)
- Sort dropdown (price, name, newest)
- Simple filter sidebar (desktop only)

**3. Product Detail Page**
- Image gallery (main + thumbnails)
- Product name, price, description
- Quantity selector
- Add to Cart button
- Product details accordion (ingredients, how to use)
- Related products

**4. Cart Page**
- Cart items list with images
- Quantity +/- controls
- Remove button
- Order summary (subtotal, shipping estimate, total)
- Proceed to Checkout button

**5. Checkout Flow**
- Single-page checkout
- Contact info (email)
- Shipping address form
- Shipping method selection
- Payment (Stripe Elements)
- Order summary sidebar
- Place Order button

**6. Order Confirmation**
- Success message
- Order number
- Order details summary
- Continue Shopping button

**7. Contact Page**
- Contact form (name, email, message)
- Company info (email, phone)
- Business hours

**8. Policies Page**
- Shipping policy
- Returns policy
- Privacy policy
- Terms of service

#### Admin Pages

**1. Admin Dashboard**
- Today's orders count
- Revenue this month
- Recent orders table (5-10)
- Quick actions

**2. Orders Management**
- Orders table with status
- Filter by status
- View order details
- Update status

**3. Products Management**
- Products table
- Add new product form
- Edit product form
- Delete product

**4. Inventory Management**
- Low stock alerts
- Quick stock update

### Component States

**Buttons**
- Default: Primary background, white text
- Hover: Slightly darker background
- Active: Darker, slight scale down
- Disabled: Gray background, 50% opacity

**Inputs**
- Default: White background, gray border
- Focus: Primary border, light Primary shadow
- Error: Error border, error message below

**Product Cards**
- Default: White background, subtle shadow
- Hover: Lift effect (translateY -4px), enhanced shadow

## Database Schema

### Models

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  price       Int      // cents
  compareAt   Int?     // cents, for sale prices
  images      String[]  // URLs
  category    String
  inventory   Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id              String        @id @default(cuid())
  email           String
  status          OrderStatus   @default(PENDING)
  shippingName    String
  shippingAddress String
  shippingCity    String
  shippingState   String
  shippingZip     String
  shippingMethod  String
  items           OrderItem[]
  subtotal        Int
  shipping        Int
  total           Int
  stripePaymentId String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  productId String
  name      String
  price     Int
  quantity  Int
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

## Functionality Specification

### Shopping Cart
- Persisted in localStorage
- Add/remove/update items
- Calculate subtotal in real-time
- Clear cart on successful order

### Checkout Flow
1. Email input (for guest checkout)
2. Shipping address (name, address, city, state, zip)
3. Shipping method selection (standard/expedited)
4. Payment via Stripe Elements
5. Submit order → Create order in DB → Clear cart → Redirect to confirmation

### Order Statuses
- PENDING: Order created, awaiting payment
- PAID: Payment confirmed
- PROCESSING: Preparing for shipment
- SHIPPED: Package sent (add tracking number)
- DELIVERED: Package received
- CANCELLED: Order cancelled

### Email Notifications
- Order confirmation email to customer
- Admin notification of new order

### Analytics Events (GA4)
- page_view
- view_item (product detail)
- add_to_cart
- begin_checkout
- purchase

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/products | List products |
| GET | /api/products/[slug] | Single product |
| POST | /api/products | Create product (admin) |
| PATCH | /api/products/[id] | Update product (admin) |
| DELETE | /api/products/[id] | Delete product (admin) |
| GET | /api/orders | List orders (admin) |
| GET | /api/orders/[id] | Single order |
| POST | /api/orders | Create order |
| PATCH | /api/orders/[id] | Update order status (admin) |
| POST | /api/checkout | Process checkout |
| POST | /api/contact | Submit contact form |

## Acceptance Criteria

### Customer Flow
- [ ] User can browse products on home/collection page
- [ ] User can view product details
- [ ] User can add product to cart
- [ ] User can modify cart quantities or remove items
- [ ] User can complete checkout without account
- [ ] User receives order confirmation email
- [ ] User sees order confirmation page

### Admin Flow
- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Admin can add new products
- [ ] Admin can edit existing products
- [ ] Admin can delete products

### Usability
- [ ] Site loads in < 3 seconds
- [ ] Fully responsive on mobile
- [ ] Clear navigation on all pages

### Required Pages Present
- [ ] Home/Collection page
- [ ] Product detail page
- [ ] Cart page
- [ ] Checkout page
- [ ] Order confirmation page
- [ ] Admin dashboard
- [ ] Orders management
- [ ] Products management
- [ ] Contact page
- [ ] Policies page