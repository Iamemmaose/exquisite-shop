import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductItem from '../component/Product';

export default function FurniturePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const funrnitureCategory = products.filter((product) => 
        product.category === "furniture"
    )

    return (
        <div className='productlist' style={{
            display: 'flex', alignItems: 'center',
            gap: '10px', flexWrap: 'wrap', marginTop: '50px', padding: '20px'
        }}>
            {funrnitureCategory.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}