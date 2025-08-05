'use client'
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

function AllProductsContent() {
    const { products } = useAppContext();
    const searchParams = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchParams.get('search');
        setSearchQuery(query || "");
        
        if (query) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchParams, products]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">
                        {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
                    </p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>
                
                {searchQuery && (
                    <p className="text-gray-600 mt-4">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <p className="text-xl font-medium text-gray-700 mb-2">No products found</p>
                            <p className="text-gray-500 text-center max-w-md">
                                {searchQuery 
                                    ? `No products match your search for "${searchQuery}". Try different keywords or browse all products.`
                                    : "No products available at the moment."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

const AllProducts = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <AllProductsContent />
        </Suspense>
    );
};

export default AllProducts;
