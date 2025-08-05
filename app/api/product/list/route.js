import ConnectDB from "@/config/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB();
        
        const products = await Product.find({}).sort({ date: -1 });

        return NextResponse.json({ 
            success: true, 
            products: products 
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ 
            success: false, 
            message: "Error fetching products" 
        }, { status: 500 });
    }
}
