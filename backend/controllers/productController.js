//This is productController, which handles the logic for creating products according to user input .
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sort } = req.query;

    const filter = {};

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting the products based on the selected options
    let sortOption = {};
    switch (sort) {
      case "priceAsc":
        sortOption = { price: 1 };
        break;
      case "priceDesc":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = {};
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//Fetching a single product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Creating a product-Admin can only create a product for listing
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//deleting the product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Updating the product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Product reviews and rating
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
  //Star-Rating is Mandatory hence this check
    if (!rating || rating === 0) {
      res.status(400);
      throw new Error("Please provide a star rating");
    }

    // Comment (review) can be optional , therefore this check.
    const reviewComment = typeof comment === "string" ? comment.trim() : "";

    //  Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You’ve already reviewed this product!");
    }
    
    
    // Create review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: reviewComment, 
      user: req.user._id,
    };

    product.reviews.push(review);

   
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "✅ Review added successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Deleting a product review
export const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const reviewId = req.params.reviewId;

  if (product) {
    const review = product.reviews.id(reviewId);

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    // Only review owner or admin can delete
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized to delete this review");
    }

    product.reviews = product.reviews.filter((r) => r._id.toString() !== reviewId);


    product.numReviews = product.reviews.length;
    product.rating =
      product.numReviews === 0
        ? 0
        : product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;

    await product.save();
    res.json({ message: "Review deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


//  Update/Edit Review
export const updateProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  const reviewId = req.params.reviewId;

  if (product) {
    const review = product.reviews.id(reviewId);

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    // Only review owner can edit
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to edit this review");
    }

    
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await product.save();


    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    res.json({ message: "Review updated successfully", review });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

