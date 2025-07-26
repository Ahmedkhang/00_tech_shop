'use client';
import { client } from '@/sanity/lib/client';

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
import { Heart, ShoppingCart, Star, Eye, Filter, Grid3X3, List, Search } from 'lucide-react';
import { Product_types } from '../../../types';

const Products = () => {
    const [products, setProducts] = useState<Product_types[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [favorites, setFavorites] = useState<string[]>([])

    useEffect(() => {
        async function fetch_products() {
            try {
                setLoading(true)
                const products: Product_types[] = await client.fetch("*[_type == 'watches']")
                setProducts(products)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetch_products()
    }, [])

    const toggleFavorite = (productId: string) => {
        setFavorites(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price
            case 'price-high':
                return b.price - a.price
            case 'name':
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-300 rounded-lg mb-8 w-64"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Our Products
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover our amazing collection of {products.length} products
                    </p>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'grid' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'list' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                {sortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' 
                            : 'space-y-4'
                    }>
                        {sortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                                }`}
                            >
                                {/* Product Image */}
                                <div className={`relative ${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''}`}>
                                    {product.image ? (
                                        <div className="relative h-48 md:h-56 overflow-hidden">
                                            <Image
                                                src={urlFor(product.image).url()}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 md:h-56 bg-gray-200 flex items-center justify-center">
                                            <div className="text-gray-400">No Image</div>
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="flex gap-2">
                                            <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                                                <Eye className="w-5 h-5 text-gray-700" />
                                            </button>
                                            <button 
                                                onClick={() => toggleFavorite(product.id)}
                                                className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                            >
                                                <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 flex-1">
                                            {product.title}
                                        </h3>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${product.price}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                ${(product.price * 1.2).toFixed(2)}
                                            </span>
                                        </div>
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            20% OFF
                                        </span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Results Summary */}
                <div className="mt-8 text-center text-gray-600">
                    Showing {sortedProducts.length} of {products.length} products
                </div>
            </div>
        </div>
    );
};

export default Products;