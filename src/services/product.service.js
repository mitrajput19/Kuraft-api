const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(requestData) {
  try {
    let topLevel = await Category.findOne({
      name: requestData.topLevelCategory,
    });

    if (!topLevel) {
      topLevel = new Category({
        name: requestData.topLevelCategory,
        level: 1,
      });
      await topLevel.save();
    }

    let secondLevel = await Category.findOne({
      name: requestData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new Category({
        name: requestData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
      await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
      name: requestData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
      thirdLevel = new Category({
        name: requestData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
      await thirdLevel.save();

    }

    const product = new Product({
      title: requestData.title,
      color: requestData.color,
      description: requestData.description,
      discountedPrice: requestData.discountedPrice,
      discountPercent: requestData.discountPercent,
      imageUrl: requestData.imageUrl,
      brand: requestData.brand,
      price: requestData.price,
      sizes: requestData.size,
      quantity: requestData.quantity,
      category: thirdLevel._id,
    });
    return await product.save();
  } catch (e) {
    throw new Error(e.message);
  }
}

async function deleteProduct(productId) {
  try {
    const product = await findProductById(productId);
    
    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully";
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateProduct(productId, requestData) {
  try {
    return await Product.findByIdAndUpdate(productId, requestData);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function findProductById(Id) {
  try {
    const product = await Product.findById(Id).populate("category").exec();

    if (!product) {
      throw new Error("Product Not Found with id" + Id);
    }
    return product;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getAllProducts(requestQuery) {
  try {
    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = requestQuery;

    pageSize = pageSize || 10;
    let query = Product.find().populate("category");
    if (category) {
      const existCategory = await Category.findOne({ name: category });
      if (existCategory) {
        query = query.where("category").equals(existCategory._id);
      } else {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
    }
    if (color) {
      const colorSet = new Set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );
      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join("|")) : null;


      query = query.where({
        color: {
          $regex: colorRegex,
          $options: "i"
        }
      });
    }

    if (sizes) {
      const sizesSet = new Set(sizes);
      query = query.where("sizes.name").in([...sizesSet]);
    }


    if (minPrice && maxPrice) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
      query = query.where("discountPercent").gte(minDiscount);
    }

    if (stock) {
      if (stock == "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock == "out_of_stock") {
        query = query.where("quantity").lt(1);
      }
    }

    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);
    return { content: products, currentPage: pageNumber, totalPages };
  } catch (e) {
    throw new Error(e.message);
  }
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
}
