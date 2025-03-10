import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppHeader } from "./cmps/AppHeader";
import { ToyIndex } from "./pages/ToyIndex";
import { ToyEdit } from "./pages/ToyEdit";
import { ToyDetails } from "./pages/ToyDetails";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <AppHeader />
          <section className="app main-layout">
            <main>
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ToyIndex />} path="/toys" />
                <Route element={<ToyEdit />} path="/toy/edit" />
                <Route element={<ToyEdit />} path="/toy/edit/:toyID" />
                <Route element={<ToyDetails />} path="/toy/:toyID" />
              </Routes>
            </main>
          </section>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
