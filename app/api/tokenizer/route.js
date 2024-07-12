import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const encryptionKey = process.env.ENCRYPTION_KEY;

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export async function POST(request) {
    const { data } = await request.json();

    // Log data terenkripsi yang diterima dari klien
    console.log("Encrypted Data:", data);

    // Dekripsi data
    const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Log data setelah dekripsi
    console.log("Decrypted Data:", decryptedData);

    const { id, productName, price, quantity } = decryptedData;

    // Generate a unique orderId
    const orderId = `order-${Math.floor(Math.random() * 1000000)}`;

    let parameter = {
        item_details: [{
            id: id,
            name: productName,
            price: price,
            quantity: quantity
        }],
        transaction_details: {
            order_id: orderId,
            gross_amount: price * quantity
        }
    };

    try {
        const token = await snap.createTransactionToken(parameter);
        console.log(token);
        return NextResponse.json({ token });
    } catch (error) {
        console.error("Failed to create transaction token:", error);
        return NextResponse.json({ error: "Failed to create transaction token" }, { status: 500 });
    }
};
