import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Combo, Home, Login, Products, Users } from "./pages";
import DefaultLayout from "./layouts/DefaultLayout";
import {
  Category,
  CreateProduct,
  ListProduct,
  UpdateProduct,
} from "./features/products";
import { ListCombo, NewCombo } from "./features/combo";
import { ListUser, NewUser, UpdateUser, UserRole } from "./features/users";
import { ProtectedRoute } from "./components";

function App() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App  bg-blue-gray h-[100vh]">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />

        {/* product */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Products />
              </DefaultLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<ListProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="category" element={<Category />} />
        </Route>

        {/* combo */}

        <Route
          path="/combos"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Combo />
              </DefaultLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<ListCombo />} />
          <Route path="create-combos" element={<NewCombo />} />
        </Route>

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Users />
              </DefaultLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<ListUser />} />
          <Route path="roles" element={<UserRole />} />
          <Route path="create-users" element={<NewUser />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
        </Route>
        
        <Route path="/login" element={ <Login/>}/>

      </Routes>
    </div>
  );
}

export default App;
