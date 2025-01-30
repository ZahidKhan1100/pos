import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import employeeReducer from "../features/employee/employeeSlice";
import roleReducer from "../features/role/roleSlice";
import permissionReducer from "../features/permissions/permissionSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import billReducer from "../features/bill/billSlice";
import reportReducer from "../features/report/reportSlice";

export default configureStore({
  reducer: {
    category: categoryReducer,
    role: roleReducer,
    employee: employeeReducer,
    permission: permissionReducer,
    product: productReducer,
    cart: cartReducer,
    bill: billReducer,
    report: reportReducer,
  },
});
