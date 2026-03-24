import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../component/Product';

const getProductListStyle = (width) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    gap: width <= 480 ? '8px' : width <= 768 ? '10px' : width <= 1024 ? '12px' : '10px',
    marginTop: width <= 480 ? 118 : width <= 768 ? 130 : width <= 1024 ? 60 : 50,
    padding: width <= 480 ? 8 : width <= 768 ? 12 : width <= 1024 ? 15 : 20,
    justifyContent: width <= 768 ? 'space-between' : 'center',
});

export default function GroceriesPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productListStyle, setProductListStyle] = useState(getProductListStyle(window.innerWidth));

    useEffect(() => {
        const handleResize = () => setProductListStyle(getProductListStyle(window.innerWidth));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products`, {
                    method: 'GET'
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await response.json();
                setProducts(data.products);
                console.log(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };

        fetchProducts()
    }, [])

    if (loading) return <div>Loading.....</div>
    if (error) return <div>Unable to Fetch Data</div>

    const groceriesCategory = products.filter((product) => 
        product.category === "groceries"
    )

    return (
        <div className='productlist' style={productListStyle}>
            {groceriesCategory.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}