import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./store/rootReducer";

const queryClient = new QueryClient();

const store = configureStore({
  reducer: RootReducer,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> 
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
