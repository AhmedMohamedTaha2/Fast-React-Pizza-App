# 🍕 Fast React Pizza

A modern, interactive pizza ordering web application built with React, Redux Toolkit, and React Router. This project is an implementation of the Fast React Pizza application, featuring a playful cartoonish design, comprehensive cart management, and user-friendly ordering flow.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Identity](#project-identity)
- [Features](#features)
- [Data Flow](#data-flow)
- [Components](#components)
- [Routes](#routes)
- [Folder Structure](#folder-structure)
- [Technologies & Libraries](#technologies--libraries)
- [Installation & Setup](#installation--setup)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [Author & Contact](#author--contact)

## 🎯 Project Overview

Fast React Pizza is a full-featured pizza ordering application that demonstrates modern React development practices. The app allows users to browse a menu of delicious pizzas, add items to their cart, manage quantities, and place orders with user information verification. Built as a learning project, it showcases state management with Redux Toolkit, routing with React Router v6, and responsive UI design with Tailwind CSS.

## 🎨 Project Identity

### Design Theme

The application features a **playful, cartoonish design** that makes ordering pizza fun and engaging. The UI combines bold borders, vibrant colors, and smooth animations to create an enjoyable user experience.

### Color Palette

- **Primary Black**: `#000000` - Used for borders and text accents
- **Dark Purple**: `#0d0221`, `#5e1d6d`, `#5a3581` - Deep purple tones for depth
- **Blue Tones**: `#355281`, `#47628c` - Calming blue shades
- **Accent Yellow**: `#ffe478` - Bright yellow for highlights and CTAs
- **Cream White**: `#fffefb` - Soft background color
- **Red Accents**: `#e63946` - Primary action color for buttons and highlights

### Typography

- **Comic Neue** / **Comic Sans MS**: Used for pizza cards and playful elements, giving the app its cartoonish character
- **Poppins**: Primary font for general UI elements, providing clean readability

### Design Elements

- Bold black borders (`border-4`, `border-black`) throughout
- Shadow effects (`shadow-[6px_6px_0_#000]`) for depth
- Smooth hover transitions and scale effects
- Custom scrollbar styling with yellow accents
- Gradient backgrounds for visual interest

## ✨ Features

### Core Functionality

- **🍕 Menu Browsing**: Browse a complete menu of pizzas with images, ingredients, and prices
- **🛒 Shopping Cart**: Add items to cart with quantity selection
- **✏️ Cart Management**:
  - Edit item quantities
  - Delete items from cart
  - View real-time total price
- **👤 User Information**:
  - Collect user details (name, phone, address) before ordering
  - Route guards prevent ordering without complete user information
  - Automatic redirect to account creation when needed
- **📦 Order Placement**:
  - Create orders with priority option
  - Order summary with delivery estimates
  - Order tracking by ID
- **🔍 Order Search**: Search for existing orders by order ID
- **📱 Responsive Design**: Fully responsive UI that works on all device sizes
- **🎨 Interactive UI**:
  - Smooth animations and transitions
  - Toast notifications for user feedback
  - Loading states and spinners
  - Modal dialogs for offers

### Additional Pages

- **Home**: Welcoming landing page with call-to-action
- **Offers**: Special pizza offers and deals
- **Locations**: Interactive map showing restaurant locations
- **About Us**: Company information and team details

## 🔄 Data Flow

### State Management

The application uses **Redux Toolkit** for centralized state management with two main slices:

#### User Slice (`userSlice.js`)

Manages user information:

- `userName`: Customer's full name
- `phone`: Contact phone number
- `address`: Delivery address

**Actions:**

- `updateName(name)`: Updates user name
- `updatePhone(phone)`: Updates phone number
- `updateAddress(address)`: Updates delivery address

#### Cart Slice (`cartSlice.js`)

Manages shopping cart state:

- `cart`: Array of cart items with pizza details, quantities, and prices

**Actions:**

- `addItem(item)`: Adds or updates item in cart
- `deleteItem(pizzaId)`: Removes item from cart
- `increaseItemQuantity(pizzaId)`: Increments item quantity
- `decreaseItemQuantity(pizzaId)`: Decrements item quantity
- `clearCart()`: Empties the entire cart

### User Verification Flow

1. **Cart Addition Guard**: When user attempts to add items to cart, the system checks if `userName`, `phone`, and `address` exist in the user slice
2. **Redirect Logic**: If any information is missing, user is redirected to `/create-account` with a toast notification
3. **Order Creation Guard**: The `CreateOrder` component uses a `useEffect` hook to verify user information before allowing order placement
4. **Automatic Redirect**: After successfully saving user information, users are automatically redirected to the menu page

### Main Data Functions

- **Adding to Cart**: `handleAddPizzaToCart()` in `FoodCard.jsx` validates user info, then dispatches `addItem()` action
- **Updating Cart**: `CartItem.jsx` uses `increaseItemQuantity()` and `decreaseItemQuantity()` actions
- **Deleting Items**: `deleteItem(pizzaId)` removes items from cart
- **Order Creation**: `CreateOrder.jsx` collects form data, validates cart, and submits to API

## 🧩 Components

### Key Components

#### `FoodCard.jsx`

- Displays individual pizza items with image, name, ingredients, and price
- Quantity selector with increment/decrement buttons
- User verification before adding to cart
- Toast notifications for user feedback
- Handles sold-out state

#### `Cart.jsx`

- Displays all cart items using `CartItem` components
- Shows total price calculation
- Provides "Order Now" button linking to order creation
- "Clear Cart" functionality
- Empty cart state handling

#### `CartItem.jsx`

- Individual cart item display
- Edit mode for quantity adjustment
- Delete functionality
- Real-time price updates

#### `CreateAccount.jsx`

- User information form (name, phone, address)
- Validates required fields
- Saves to Redux store and localStorage
- Automatic redirect to menu after submission

#### `CreateOrder.jsx`

- Order confirmation form
- Pre-fills user information from Redux store
- Priority order option
- Route guard for user information
- Form validation and error handling
- Submits order to API

#### `Order.jsx`

- Displays order summary
- Shows order status and delivery estimate
- Lists all items in the order
- Calculates total with priority fee
- Uses React Router loader for data fetching

#### `Menu.jsx`

- Main menu page displaying all available pizzas
- Uses React Router loader to fetch menu data
- Responsive grid layout
- Scrollable container with custom styling

#### `Header.jsx`

- Navigation bar with logo and menu links
- Cart icon with item count badge
- User info button/display
- Mobile-responsive hamburger menu
- Order search functionality

#### `AppLayout.jsx`

- Main layout wrapper
- Includes Header and Footer
- Loading spinner overlay during navigation
- Outlet for child routes

### Component Interaction Flow

```
User → Menu → FoodCard → (User Check) → Cart
                                      ↓
                              CreateAccount (if needed)
                                      ↓
                              Cart → CreateOrder → Order Summary
```

## 🛣️ Routes

The application uses **React Router v6** with the following route structure:

| Route             | Component       | Purpose                                       |
| ----------------- | --------------- | --------------------------------------------- |
| `/`               | `Home`          | Landing page with welcome message             |
| `/menu`           | `Menu`          | Browse all available pizzas                   |
| `/create-account` | `CreateAccount` | Enter user information (name, phone, address) |
| `/login`          | `CreateAccount` | Alias for account creation                    |
| `/cart`           | `Cart`          | View and manage shopping cart                 |
| `/order/new`      | `CreateOrder`   | Create a new order (requires user info)       |
| `/order/:id`      | `Order`         | View order details by ID                      |
| `/offers`         | `Offers`        | View special offers and deals                 |
| `/locations`      | `Locations`     | Find restaurant locations                     |
| `/about`          | `AboutUs`       | Learn about the company                       |
| `*`               | `Error`         | 404 error page                                |

### Route Protection

- `/order/new`: Protected by user information check in `CreateOrder` component
- Cart actions: Protected by user verification in `FoodCard` component

## 📁 Folder Structure

```
fast-react-pizza/
├── public/
│   └── images/          # Pizza images, logos, decorative assets
├── src/
│   ├── features/        # Feature-based components
│   │   ├── cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartOverview.jsx
│   │   │   ├── EmptyCart.jsx
│   │   │   └── cartSlice.js      # Redux cart slice
│   │   ├── menu/
│   │   │   ├── FoodCard.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── MenuItem.jsx
│   │   ├── order/
│   │   │   ├── CreateOrder.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── OrderItem.jsx
│   │   │   └── SearchOrder.jsx
│   │   └── user/
│   │       ├── CreateUser.jsx
│   │       └── userSlice.js      # Redux user slice
│   ├── ui/              # Shared UI components
│   │   ├── AboutUs.jsx
│   │   ├── AppLayout.jsx
│   │   ├── CreateAccount.jsx
│   │   ├── Error.jsx
│   │   ├── FooterComponent.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Locations.jsx
│   │   ├── Login.jsx
│   │   ├── OfferModal.jsx
│   │   ├── Offers.jsx
│   │   └── UserNameInput.jsx
│   ├── services/        # API services
│   │   ├── apiGeocoding.js
│   │   └── apiRestaurant.js
│   ├── utilites/       # Helper functions
│   │   └── helpers.js
│   ├── App.jsx         # Main app component with routing
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   ├── main.jsx        # Application entry point
│   └── store.js        # Redux store configuration
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies & Libraries

### Core Technologies

- **React 19.1.1** - UI library
- **React DOM 19.1.1** - React rendering
- **Vite 7.1.0** - Build tool and dev server

### State Management

- **Redux Toolkit 2.9.0** - State management
- **React Redux 9.2.0** - React bindings for Redux

### Routing

- **React Router DOM 6.30.1** - Client-side routing with loaders and actions

### Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.11** - Vite plugin for Tailwind

### UI Enhancements

- **React Hot Toast 2.6.0** - Toast notifications for user feedback

### Development Tools

- **ESLint 9.32.0** - Code linting
- **Vite Plugin React 4.7.0** - React support for Vite
- **TypeScript Types** - Type definitions for React

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Step-by-Step Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fast-react-pizza
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 🔮 Future Improvements

### Planned Features

- [ ] **Automatic Location Detection**: Integrate geolocation API to auto-fill user address
- [ ] **User Authentication**: Add login/signup functionality with persistent sessions
- [ ] **Order History**: Display past orders for logged-in users
- [ ] **Payment Integration**: Add payment gateway for order completion
- [ ] **Real-time Order Tracking**: Live updates on order status
- [ ] **Favorites System**: Allow users to save favorite pizzas
- [ ] **Advanced Filtering**: Filter menu by price, ingredients, dietary restrictions
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **PWA Support**: Make the app installable as a Progressive Web App
- [ ] **Multi-language Support**: Internationalization (i18n) for multiple languages

### UI/UX Enhancements

- [ ] More interactive animations and micro-interactions
- [ ] Enhanced loading states with skeleton screens
- [ ] Improved mobile navigation experience
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Image lazy loading optimization
- [ ] Smooth page transitions

### Technical Improvements

- [ ] Unit and integration tests with Jest/React Testing Library
- [ ] Error boundary implementation for better error handling
- [ ] Performance optimization (code splitting, memoization)
- [ ] API error handling improvements
- [ ] Form validation library integration
- [ ] TypeScript migration for type safety

## 📸 Screenshots

### Home Page

![Home Page](./public/images/home-placeholder.png)
_Welcoming landing page with call-to-action_

### Menu Page

![Menu Page](./public/images/menu-placeholder.png)
_Browse available pizzas with images and details_

### Cart Page

![Cart Page](./public/images/cart-placeholder.png)
_Manage your order with quantity controls_

### Order Summary

![Order Summary](./public/images/order-placeholder.png)
_View order details and delivery estimate_

---

## 👤 Author & Contact

**Fast React Pizza**  
_Based on the Fast React Pizza course project_

### Contact Information

- **GitHub**: [Your GitHub Profile]
- **Email**: [Your Email]
- **Portfolio**: [Your Portfolio URL]

---

## 📄 License

This project is created for educational purposes as part of a React learning course.

---

## 🙏 Acknowledgments

- Inspired by the Fast React Pizza course project
- Design inspiration from modern pizza ordering applications
- Built with love for pizza and React! 🍕❤️

---

**Made with ❤️ and React**
