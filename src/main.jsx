import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { getRouterBasename } from "./lib/appBase.js";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext.jsx";
import { ContentProvider } from "./context/ContentContext";
import { ProductsProvider } from "./context/ProductsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={getRouterBasename()}>
      <AuthProvider>
        <ProductsProvider>
          <ContentProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ContentProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
