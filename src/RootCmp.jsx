import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppHeader } from "./cmps/AppHeader";

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
              </Routes>
            </main>
          </section>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
