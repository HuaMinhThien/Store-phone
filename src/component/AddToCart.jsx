"use client"

export default function AddToCart ({product}) {

    const handleAddToCart = () =>{
        const cart = JSON.parse(localStorage.getItem('cart') || "[]");
        
        const validateProduct = cart.find((item) => item.id == product.id);
        if(validateProduct){
            validateProduct.cart_quantity += 1;
        }
        else{
            const newCartItem = {...product, cart_quantity: 1};
            cart.push(newCartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Đã thêm ${product.name} vào giỏ hàng`);
        
        


    }
    

    return(
        <button className="btn btn-cart" onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i>
            THÊM VÀO GIỎ
        </button>
    )

}