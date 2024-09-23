import { useEffect, useState } from 'react';

interface ReviewFormProps {
  eventId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ eventId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');

    if (!token) {
      setSubmitStatus('User not logged in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          eventId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();
      setSubmitStatus('Review submitted successfully!');
      setRating(0);
      setComment('');
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('Failed to submit review');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="rating"
            className="block text-gray-700 font-medium mb-2"
          >
            Rating (1-5):
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg h-28"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Submit Review
        </button>
        {submitStatus && (
          <p
            className={`mt-2 ${submitStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}
          >
            {submitStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
