export const host = "http://localhost:3100";

//Category Routes

export const addCategoryRoute = `${host}/api/category/addcategory`;
export const getCategoriesRoute = `${host}/api/category/getcategories`;
export const deleteCategoryRoute = `${host}/api/category/deletecategory`;

//Employee Routes

export const addEmployeeRoute = `${host}/api/employee/addemployee`;
export const getEmployeesRoute = `${host}/api/employee/getemployees`;
export const deleteEmployeeRoute = `${host}/api/employee/deleteemployee`;

//Role Route

export const getRolesRoute = `${host}/api/role/getroles`;
export const addRoleRoute = `${host}/api/role/addrole`;
export const deleteRoleRoute = `${host}/api/role/deleterole`;

//Permissions Route
export const getPermissionsRoute = `${host}/api/permissions/getpermissions`;

//Products Routes

export const addProductRoute = `${host}/api/product/addproduct`;
export const getProductsRoute = `${host}/api/product/getproducts`;
export const deleteProductRoute = `${host}/api/product/deleteproduct`;

// Sale Routes
export const addSaleRoute = `${host}/api/sale/addsale`;
export const getBills = `${host}/api/sale/getbills`;
export const dailySalesRoute = `${host}/api/sale/dailysales`;
export const dailyProductsSaleRoute = `${host}/api/sale/dailyproductsales`;

// Login Routes
export const loginRoute = `${host}/api/auth/login`;
