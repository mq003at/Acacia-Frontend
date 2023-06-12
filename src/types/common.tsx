export interface Common {
    id: number,
    creationAt?: string,
    updatedAt?: string
}

export interface Category extends Common {
    name: string,
    images: string[]
}

export interface Product extends Common {
    title: string,
    price: number,
    description: string
    images: string[]
    category: Category
}

export interface ProductAdd  {
    title: string,
    price: number,
    description: string
    images: string[]
    categoryId: number
}

export interface CategoryAdd {
    name: string,
    images: string[]
}

export interface Cart extends Common {
    cartItems: CartItem[]
}

export interface CartProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    categoryId: number,
    images: string[]
}

export interface CartItem {
    product: CartProduct,
    quantity: number
}

export interface CartRequest {
    productId: number,
    quantity: number
}

export interface CartReducer {
    cart?: CartItem[],
    updatedAt: string,
    userId?: number,
    cartSearchResult?: Product[],
}

export interface ResponseImage {
    originalname: string,
    filename: string,
    location: string
}

export interface UpdatedProduct {
    id: number,
    update: Partial<Product>
}

export interface UpdatedCategory {
    id: number,
    update: Category,
    userToken: string
}

export interface AddProductWithImageParams {
    imageArray: File[],
    product: Product
}

export interface AddCategoryWithImageParams {
    image: File,
    category: Category
}