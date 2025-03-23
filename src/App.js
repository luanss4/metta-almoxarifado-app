import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Home from "./Home";
import "./App.css";
import "./menu.css";

function App() {
  return (
      <Router>
        <div className="App">
          {/* Menu de navegação */}
          <header className="App-header">
            <nav className="menu">
              <ul>
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
              </ul>
              {/* Adicionando a logo */}
              <div className="logo-container">
                <img
                    src="/1710100065655.jpg"
                    alt="Logo"
                    className="logo"
                />
              </div>
            </nav>
          </header>

          {/* Configuração das Rotas */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<ProductList />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;