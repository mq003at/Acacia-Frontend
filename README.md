# Front-end Project

![Generic badge](https://img.shields.io/badge/JS-ES6-yellow.svg)
![Generic badge](https://img.shields.io/badge/SCSS-v.1.57-red.svg)
![Generic badge](https://img.shields.io/badge/Redux-v.8.0.5-orangered.svg)
![Generic badge](https://img.shields.io/badge/MUI-v.5.11-darkblue.svg)
![Generic badge](https://img.shields.io/badge/TS-v.4.9-blue.svg)
![Generic badge](https://img.shields.io/badge/React-v.18.2-orange.svg)
![Generic badge](https://img.shields.io/badge/Jest-v.29.0.3-white.svg)
![Generic badge](https://img.shields.io/badge/Router-v.6.6-lightyellow.svg)

Deployment: [Link](https://mq003at.github.io/mq003at.github.io-css-sass/)

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

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.