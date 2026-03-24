import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';


export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate();

    const [detail, setDetail] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [newReview, setNewReview] = useState({
        reviewerName: '',
        comment: '',
        rating: ''
    })

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch details')
                }

                const data = await response.json()
                setDetail(data)
                setReviews(data.reviews || [])
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDetail()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewReview((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newReview.reviewerName || !newReview.comment || !newReview.rating) {
            alert('Please fill all review fields')
            return
        }

        const reviewToAdd = {
            reviewerName: newReview.reviewerName,
            comment: newReview.comment,
            rating: Number(newReview.rating),
            date: new Date().toISOString()
        }

        setReviews((prevReviews) => [reviewToAdd, ...prevReviews])

        setNewReview({
            reviewerName: '',
            comment: '',
            rating: ''
        })
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!detail) return <p>No product found</p>

    return (
        <div className="product-detail-page">
            {/* Top Section */}
            <div className="product-detail-top">
                {/* Left - Image */}
                <div className="product-detail-image">
                    <img src={detail.thumbnail} alt={detail.title} />
                </div>

                {/* Right - Main Info */}
                <div className="product-detail-info">
                    <h1>{detail.title}</h1>
                    <p className="brand">Brand: {detail.brand}</p>
                    <p className="category">Category: {detail.category}</p>

                    <div className="price-rating">
                        <h2>${detail.price}</h2>
                        <p>⭐ {detail.rating}</p>
                    </div>

                    <p className="discount">Discount: {detail.discountPercentage}% OFF</p>
                    <p className="stock">
                        Stock: {detail.stock} ({detail.availabilityStatus})
                    </p>

                    <p className="description">{detail.description}</p>

                    <div className="tags">
                        {detail.tags?.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        className="contact-button"
                        onClick={() =>
                            navigate('/contactpage', {
                                state: {
                                    product: detail,   // send full product info including id
                                },
                            })
                        }
                    >
                        Contact me
                    </button>
                </div>
            </div>

            {/* Extra Product Info */}
            <div className="product-extra-info">
                <h3>Product Information</h3>
                <p><strong>SKU:</strong> {detail.sku}</p>
                <p><strong>Weight:</strong> {detail.weight} kg</p>
                <p>
                    <strong>Dimensions:</strong> {detail.dimensions?.width} x {detail.dimensions?.height} x {detail.dimensions?.depth}
                </p>
                <p><strong>Shipping:</strong> {detail.shippingInformation}</p>
                <p><strong>Return Policy:</strong> {detail.returnPolicy}</p>
                <p><strong>Warranty:</strong> {detail.warrantyInformation}</p>
                <p><strong>Minimum Order Quantity:</strong> {detail.minimumOrderQuantity}</p>
            </div>

            {/* Reviews Section */}
            <div className="review-section">
                <h3>Customer Reviews</h3>

                {reviews.length > 0 ? (
                    <div className="review-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h4>{review.reviewerName}</h4>
                                <p>⭐ {review.rating}</p>
                                <p>{review.comment}</p>
                                <small>{new Date(review.date).toLocaleDateString()}</small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* Add Review Form */}
            <div className="add-review-section">
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit} className="review-form">
                    <input
                        type="text"
                        name="reviewerName"
                        placeholder="Your Name"
                        value={newReview.reviewerName}
                        onChange={handleChange}
                    />

                    <textarea
                        name="comment"
                        placeholder="Write your comment..."
                        value={newReview.comment}
                        onChange={handleChange}
                    ></textarea>

                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                        value={newReview.rating}
                        onChange={handleChange}
                    />

                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    )
}