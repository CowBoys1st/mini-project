import { useEffect, useState } from "react";

interface IReview {
    id: number;
    userId: number;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        name: string;
    };
}

interface ReviewListProps {
    eventId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ eventId }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem("token");
            console.log("Fetching reviews for eventId:", eventId);

            if (!token) {
                throw new Error("No token found in localStorage");
              }
            try {
                const response = await fetch(`http://localhost:8000/api/reviews?eventId=${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Response status:", response.status);

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                console.log("Received reviews data:", data);
                setReviews(data.reviews || []);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch reviews', error);
                setLoading(false);
            }
        }

        fetchReviews();
    }, [eventId]);

    if (loading) return <p>Loading reviews...</p>

    if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">{review.user.name}</h4>
                        <span className="bg-yellow-500 text-white py-1 px-2 rounded-lg text-sm">{review.rating}/5</span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ReviewList;