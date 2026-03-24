
import { useNavigate } from "react-router-dom";
import "./Product.css";


const Product = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="productiTem">
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", background: "#fff" }}
            />

            <div className="productcontent">
                <h2>{product.brand}</h2>
            </div>

            <div className="price">
                <h4>Category: {product.category}</h4>
                <p>
                    Price: ${product.price} <span>Rating: {product.rating}</span>
                </p>
            </div>

            <button
                onClick={() => navigate(`/products/${product.id}`)}
                style={{ padding: "10px 20px", cursor: "pointer" }}
            >
                View Product
            </button>
        </div>
    );
};

export default Product;