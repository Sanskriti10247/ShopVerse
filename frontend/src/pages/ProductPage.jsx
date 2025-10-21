import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function RatingStars({ value, text, onSelect }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center space-x-1 mb-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onSelect && onSelect(star)}
          className={`text-xl sm:text-2xl focus:outline-none transition ${
            value >= star
              ? "text-yellow-400"
              : "text-gray-300 hover:text-yellow-300"
          }`}
        >
          ★
        </button>
      ))}
      {text && (
        <span className="text-gray-600 text-xs sm:text-sm ml-2">{text}</span>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [qty, setQty] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflowX = "auto");
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 && comment.trim() === "") return alert("Error submitting review");
    if (rating === 0 && comment.trim() !== "") return alert("Please select a star rating ⭐");

    try {
      setLoadingReview(true);
      const endpoint = editingReviewId
        ? `http://localhost:5001/products/${product._id}/reviews/${editingReviewId}`
        : `http://localhost:5001/products/${product._id}/reviews`;

      const method = editingReviewId ? "patch" : "post";
      await axios[method](
        endpoint,
        { rating, comment: comment.trim() },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(
        editingReviewId
          ? "✅ Review updated successfully!"
          : "✅ Review added successfully!"
      );
      setRating(0);
      setComment("");
      setEditingReviewId(null);
      window.location.reload();
    } catch (error) {
      const message = error.response?.data?.message || "Error submitting review";
      alert(message);
    } finally {
      setLoadingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(
        `http://localhost:5001/products/${product._id}/reviews/${reviewId}`,
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      alert("Review deleted!");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting review");
    }
  };

  const handleEditReview = (r) => {
    setRating(r.rating);
    setComment(r.comment);
    setEditingReviewId(r._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    setQty(1);
    dispatch(addToCart({ ...product, qty: 1, product: product._id }));
  };

  const handleQtyChange = (type) => {
    if (type === "inc" && qty < product.countInStock) {
      const newQty = qty + 1;
      setQty(newQty);
      dispatch(addToCart({ ...product, qty: newQty, product: product._id }));
    } else if (type === "dec" && qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(addToCart({ ...product, qty: newQty, product: product._id }));
    } else if (type === "dec" && qty === 1) {
      setQty(0);
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading product details...
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden px-4 sm:px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        <div className="flex justify-center items-center bg-white rounded-lg shadow-sm p-3 sm:p-5">
          <img
            src={
              product.image?.trim()
                ? product.image
                : "https://res.cloudinary.com/dh1llydjj/image/upload/v1728912922/default-placeholder.jpg"
            }
            alt={product.name}
            className="rounded-lg shadow-md w-full max-w-md h-auto object-contain"
          />
        </div>

   <div className="flex flex-col justify-center max-w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800 break-words">
            {product.name}
          </h1>

          <RatingStars
            value={rating || product.rating}
            text={`${product.numReviews} reviews`}
            onSelect={userInfo ? setRating : null}
          />

          <p className="text-gray-600 text-base sm:text-lg mb-1">
            Brand:{" "}
            <span className="font-semibold text-gray-900">{product.brand}</span>
          </p>
          <p className="text-gray-600 text-base sm:text-lg mb-2">
            Category:{" "}
            <span className="font-semibold text-gray-900">
              {product.category}
            </span>
          </p>

          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          <p className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-3">
            ${product.price?.toFixed(2)}
          </p>

          <p
            className={`mb-4 sm:mb-6 font-medium ${
              product.countInStock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.countInStock > 0
              ? `In Stock (${product.countInStock} available)`
              : "Out of Stock"}
          </p>

          {qty === 0 ? (
            <button
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-base sm:text-lg font-medium transition ${
                product.countInStock > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQtyChange("dec")}
                className="bg-gray-200 hover:bg-gray-300 text-xl px-3 py-2 rounded-lg"
              >
                ➖
              </button>
              <span className="text-xl font-semibold">{qty}</span>
              <button
                onClick={() => handleQtyChange("inc")}
                disabled={qty >= product.countInStock}
                className={`text-xl px-3 py-2 rounded-lg ${
                  qty >= product.countInStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                ➕
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 sm:mt-16 border-t border-gray-200 pt-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
          Customer Reviews
        </h2>

        {product.reviews?.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((r) => {
              const isUserReview = userInfo && r.user === userInfo._id;
              return (
                <div
                  key={r._id}
                  className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 relative"
                >
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <RatingStars value={r.rating} />
                  <p className="text-gray-700 text-sm sm:text-base break-words">
                    {r.comment}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>

                  {isUserReview && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEditReview(r)}
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className="text-red-600 hover:text-red-800 text-xs sm:text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center sm:text-left">
            No reviews yet. Be the first!
          </p>
        )}

        <div className="mt-10 sm:mt-12">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
            {editingReviewId ? "Edit Your Review" : "Write a Review"}
          </h3>

          {userInfo ? (
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <p className="text-gray-700 mb-1 text-sm sm:text-base">
                  Your Rating:
                </p>
                <RatingStars value={rating} onSelect={setRating} />
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="border p-3 rounded w-full h-28 text-sm sm:text-base"
              />

              <button
                type="submit"
                disabled={loadingReview}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm sm:text-base"
              >
                {loadingReview
                  ? "Submitting..."
                  : editingReviewId
                  ? "Update Review"
                  : "Submit Review"}
              </button>
            </form>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              Please{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 underline"
              >
                login
              </button>{" "}
              to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
