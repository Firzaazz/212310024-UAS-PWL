// import React from 'react';
// import './ProductCatalog.css'; // Import CSS file

// export const product = {
//     id: ~~(Math.random() * 100) + 1,
//     image: "/img.png",
//     name: "LEVI'S® WOMEN'S XL TRUCKER JACKET",
//     price: 350000,
//     description: "Design user interfaces and experiences.",
//     colors: [
//         { value: "putih", label: "Putih" },
//         { value: "biru", label: "Biru" },
//         { value: "coklat", label: "Coklat" },
//         { value: "kuning", label: "Kuning" }
//     ]
// };

// const ProductCatalog = () => {
//     return (
//         <div className="product-catalog">
//             <div className="product-card" key={product.id}>
//                 <img src={product.image} alt={product.name} className="product-image" />
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-price">Rp {product.price.toLocaleString('id-ID')}</p>
//                 <p className="product-description">{product.description}</p>
//                 <div className="product-colors">
//                     <h3>Available Colors:</h3>
//                     <ul>
//                         {product.colors.map(color => (
//                             <li key={color.value}>{color.label}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCatalog;
