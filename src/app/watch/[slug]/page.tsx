// import { client } from "@/sanity/lib/client";
// import { Product_types } from "../../../../types";
// import { groq } from "next-sanity";

// interface ProductPageProps {
//     params:{slug:string}
// }
// async function getProducts( slug : string):Promise<Product_types | null> {
//     return  client.fetch(groq`*[_type == laptops && slug.current == $slug][0]{
//           id,title,slug,image,detailImage_2,detailImage_3,detailImage_3,category,price
//         }`,
//     { slug })
    
// }

// export default async function DynamicLaptops({params}:ProductPageProps){
//     const { slug } = params
//     const laptops = await getProducts(slug)
// }

import { client } from "@/sanity/lib/client";
import { Product_types } from "../../../../types";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { 
    Heart, 
    ShoppingCart, 
    Star, 
    Truck, 
    Shield, 
    RotateCcw, 
    Share2,
    Minus,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}


async function getProduct(slug: string): Promise<Product_types | null> {
    return client.fetch(groq`*[_type == "laptops" && slug.current == $slug][0]{
          id,
          title,
          slug,
          image,
          detailImage_2,
          detailImage_3,
          category,
          price,
          description,
          specifications,
          inStock,
          brand,
          model,
          features
        }`,
        { slug }
    )
}


export default async function DynamicLaptops({ params }: ProductPageProps) {
    const { slug } = await params;
    const laptop = await getProduct(slug);

    if (!laptop) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/laptops" className="hover:text-blue-600 transition-colors">Laptops</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{laptop.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <ProductImageGallery laptop={laptop} />

                    {/* Product Details */}
                    <ProductDetails laptop={laptop} />
                </div>

                {/* Product Specifications */}

                {/* Related Products */}
                <RelatedProducts currentProductId={laptop.id} />
            </div>
        </div>
    );
}

// Product Image Gallery Component
function ProductImageGallery({ laptop }: { laptop: Product_types }) {
    const images = [
        laptop.image,
        laptop.detailImage_2,
        laptop.detailImage_3
    ].filter(Boolean);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group">
                {laptop.image && (
                    <Image
                        src={urlFor(laptop.image).url()}
                        alt={laptop.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                    />
                )}
                
                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to zoom
                </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                            {image && (
                                <Image
                                    src={urlFor(image).url()}
                                    alt={`${laptop.title} view ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Product Details Component
function ProductDetails({ laptop }: { laptop: Product_types }) {
    return (
        <div className="space-y-6">
            {/* Title and Rating */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {laptop.category || 'Laptop'}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        In Stock
                    </span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {laptop.title}
                </h1>

                <div className="flex items-center gap-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-600">(124 reviews)</span>
                </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl font-bold text-blue-600">
                        ${laptop.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                        ${(laptop.price * 1.15).toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Save 15%
                    </span>
                </div>
                <p className="text-gray-600">Free shipping on orders over $500</p>
            </div>

            {/* Key Features */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                    {[
                        "Intel Core i7 Processor",
                        "16GB DDR4 RAM",
                        "512GB SSD Storage",
                        "15.6\" Full HD Display",
                        "NVIDIA Graphics Card"
                    ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button className="p-2 hover:bg-gray-100 transition-colors">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-l border-r border-gray-300">1</span>
                        <button className="p-2 hover:bg-gray-100 transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                    </button>
                    <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5" />
                        Wishlist
                    </button>
                    <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Shipping and Returns */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">30-day return policy</span>
                </div>
                <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">2-year warranty included</span>
                </div>
            </div>
        </div>
    );
}



// Related Products Component
async function RelatedProducts({ currentProductId }: { currentProductId: string }) {
    // Fetch related products (e.g., same category, excluding current product)
    const relatedProducts = await client.fetch(
        groq`*[_type == "laptops" && _id != $currentProductId][0...4]{
            id,
            title,
            slug,
            image,
            price
        }`,
        { currentProductId }
    );

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product: Product_types) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                    >
                        <div className="relative h-48 bg-gray-200">
                            {product.image && (
                                <Image
                                    src={urlFor(product.image).url()}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                            <p className="text-blue-600 font-bold">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}