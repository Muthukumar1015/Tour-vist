"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Home from "../components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
