# Welcome to Acacia-Frontend
Acacia is a website written in ReactJS with Typescript. It is connected to a backend server coded with ASP.Net and uses Postgresql as its database. Normally, the site is hosted on Azure but the backend has been taken down due to the lack of funds running backend server for a long time

<ins>Demo</ins>: Will be updated when the backend situation is solved. 

# Tech used
![Generic badge](https://img.shields.io/badge/SCSS-v.1.57-red.svg)
![Generic badge](https://img.shields.io/badge/Redux-v.8.0.5-orangered.svg)
![Generic badge](https://img.shields.io/badge/MUI-v.5.11-darkblue.svg)
![Generic badge](https://img.shields.io/badge/TS-v.4.9-blue.svg)
![Generic badge](https://img.shields.io/badge/React-v.18.2-orange.svg)
![Generic badge](https://img.shields.io/badge/Jest-v.27.5-white.svg)
![Generic badge](https://img.shields.io/badge/Router-v.6.6-lightyellow.svg)

# Guide
## 1. How to install and run the project locally
Just like with any ReactJS app, you can run **npm run start**. It is recommended to run the project in Chromium browsers like Chrome, Edge, Brave, etc.

## 2. Usage
Will be updated in the future when the backend situation is resolved.

# Project Structure
<details>
<summary>Open Project Structure</summary>

```bash
└── frontend
    ├── assets
    │   ├── fonts
    │   └── images.png
    ├── components
    │   ├── basic
    │   │   ├── Error.tsx
    │   │   ├── ProductCard.tsx
    │   │   └── SaleIcon.tsx
    │   ├── cart
    │   │   └── Cart.tsx
    │   ├── frontPage
    │   │   ├── FrontPage.tsx
    │   │   └── SpecialOffers.tsx
    │   ├── functions
    │   │   └── common.tsx
    │   ├── header
    │   │   ├── Banner.tsx
    │   │   ├── Header.tsx
    │   │   ├── HeaderButtons.tsx
    │   │   ├── LeftNav.tsx
    │   │   ├── MiddleNav.tsx
    │   │   └── RightNav.tsx
    │   ├── products
    │   │   ├── AddProductModal.tsx
    │   │   ├── CartItemDetails.tsx
    │   │   ├── ProductBox.tsx
    │   │   ├── ProductDetail.tsx
    │   │   ├── ProductFullDetails.tsx
    │   │   └── ProductList.tsx
    │   ├── profile
    │   │   ├── LogUser.tsx
    │   │   ├── Profile.tsx
    │   │   ├── ProfileSchema.tsx
    │   │   └── UserDetails.tsx
    │   ├── hooks
    │   │   └── reduxHook.ts
    │   ├── redux
    │   │   ├── reducers
    │   │   │   ├── cartReducer.ts
    │   │   │   ├── categoryReducer.ts
    │   │   │   ├── productReducer.ts
    │   │   │   └── userReducer.ts
    │   │   └── store.ts
    │   ├── styles
    │   │   ├── css
    │   │   ├── mui
    │   │   └── index.scss
    │   └── types
    │       ├── common.tsx
    │       ├── props.tsx
    │       └── user.tsx
    ├── App.tsx
    └── index.tsx
```
</details>

