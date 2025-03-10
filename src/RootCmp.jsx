import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppHeader } from "./cmps/AppHeader";
import { ToyIndex } from "./pages/ToyIndex";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <AppHeader />
          <section className="app main-layout">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/toys" element={<ToyIndex />} />
              </Routes>
            </main>
          </section>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
