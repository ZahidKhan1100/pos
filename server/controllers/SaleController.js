const Sale = require("../models/Sale");
const Product = require("../models/Product");

async function addSale(req, res, next) {
  try {
    const { items, totalAmount } = req.body;

    // Remove 'description' property from each item
    const modifiedItems = items.map((item) => {
      const {
        description,
        category_id,
        category_name,
        quantity_in_stock,
        ...rest
      } = item;
      return rest;
    });

    const updateQuantity = items.map(async (item) => {
      const product = await Product.findById(item._id);
      if (product) {
        const updatedQuantity = product.quantity_in_stock - item.quantity;

        await Product.findByIdAndUpdate(
          item._id,
          {
            quantity_in_stock: updatedQuantity,
          },
          { new: true }
        );
      }
    });

    const sale = await Sale.create({
      name: "abc",
      items: modifiedItems,
      total_amount: totalAmount,
    });

    return res.json({ status: true, sale: sale });
  } catch (ex) {
    next(ex);
  }
}

async function getBills(req, res, next) {
  try {
    const bills = await Sale.find();
    return res.json({ status: true, bills: bills });
  } catch (ex) {
    next(ex);
  }
}

async function dailySales(req, res, next) {
  try {
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const dailySales = await Sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
          },
        },
      },
      {
        $addFields: {
          total_amount_numeric: { $toDouble: "$total_amount" },
        },
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total_amount_numeric: 1,
        },
      },
      {
        $group: {
          _id: "$date",
          total_sales: { $sum: "$total_amount_numeric" },
        },
      },
    ]);
    return res.json({ status: true, dailySales: dailySales });
  } catch (error) {
    next(error);
  }
}

async function dailyProductsSaleQuantity(req, res, next) {
  try {
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const productQuantity = await Sale.aggregate([
      // {
      //   $match: {
      //     createdAt: {
      //       $gte: firstDayOfMonth,
      //       $lte: lastDayOfMonth,
      //     },
      //   },
      // },
      {
        $unwind: "$items", // Unwind the items array
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          productName: "$items.name",
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            productName: "$productName",
          },
          count: { $sum: 1 }, // Count the occurrences of each product for each date
        },
      },
      {
        $sort: { "_id.date": 1 }, // Optionally, sort the results by date
      },
    ]);

    return res.json({ status: true, productQuantity: productQuantity });
  } catch (error) {
    next(error);
  }
}

module.exports = { addSale, getBills, dailySales,dailyProductsSaleQuantity };
