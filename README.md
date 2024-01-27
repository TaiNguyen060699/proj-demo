## Overview

This project demonstrates the implementation of an infinite scrolling product list using a dummy product API. The primary functionalities include fetching the next 20 products when the user scrolls to the end of the list, displaying product information, and allowing users to search for products by name.

## Features

- **Infinite Scrolling**: The list automatically fetches the next set of 20 products when the user scrolls to the end.  
- **Product Display**: The product list is displayed with relevant information, including product name, price, and image.  
- **Search Functionality**: Users can search for products by entering the product name in the search input. The product list updates dynamically as the user types.  
- **Data Deserialization**: Products data is deserialized after being fetched from the API.  

## Installation

```bash
# Clone the repository
git clone git@github.com:TaiNguyen060699/proj-infinite-scroll-and-search-.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Structure source code

```
├── src
│   ├── assets
│   ├── components
│   │   ├── BackToTop.vue
│   │   ├── LoadingProgress.vue
│   │   ├── LoadingSpinner.vue
│   │   └── ProductCard.vue
│   ├── pages
│   │   ├── HomePage.vue
│   ├── repositories
│   │   ├── api.ts
│   │   ├── constants.vue
│   │   └── http.vue
│   ├── types
│   │   └──  index.ts
│   ├── App.vue
│   ├── main.vue
│   └── router.vue
├── eslintrc.cjs
├── README.md
├── package-lock.json
├── package.json
├── prettierrc.json
├── tsconfig.json
├── vite.config.ts
```
## Contributor

- Tai Nguyen - tainguyen06061999@gmail.com
