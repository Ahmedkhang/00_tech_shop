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
//     if (!laptops){
//         return <h1 className="w-screen h-screen text-center py-50">Products Not found</h1>
//     }
// }
import { client } from "@/sanity/lib/client";
import { Product_types } from "../../../../types";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductPageProps {
  params: { slug: string };
}

async function getProducts(slug: string): Promise<Product_types | null> {
  return client.fetch(
    groq`*[_type == "mobiles" && slug.current == $slug][0]{
      id,
      title,
      slug,
      image,
      detailImage_2,
      detailimage_3,
      category,
      price
    }`,
    { slug }
  );
}

export default async function DynamicLaptops({ params }: ProductPageProps) {
  const { slug } = params;
  const mobiles = await getProducts(slug);

  if (!mobiles) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative w-full h-96">
                {mobiles.image && (
                  <Image
                    src={urlFor(mobiles.image).url()}
                    alt={mobiles.title}
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mobiles.detailImage_2 && (
                  <div className="relative w-full h-48">
                    <Image
                      src={urlFor(mobiles.detailImage_2).url()} // Added urlFor
                      alt={`${mobiles.title} detail 2`}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}
                {mobiles.detailImage_3 && (
                  <div className="relative w-full h-48">
                    <Image
                      src={urlFor(mobiles.detailImage_3).url()}
                      alt={`${mobiles.title} detail 3`}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{mobiles.title}</h1>
              <p className="text-xl text-gray-600">Category: {mobiles.category}</p>
              <p className="text-2xl font-semibold text-green-600">
                ${mobiles.price.toFixed(2)}
              </p>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}