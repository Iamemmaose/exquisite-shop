import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();


  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <span>Exquisite Shop</span>
      </div>

      <ul>
        <li>
          <Link to="/">All Product</Link>
          <Link to="/beautypage">Beauty</Link>
          <Link to="/fragrancepage">Fragrances</Link>
          <Link to="/furniturepage">Furnitures</Link>
          <Link to="/groceriespage">Groceries</Link>
        </li>
      </ul>

      <div className="nav2">
        <h1>
          <Link to='/contactme'>Contact Us</Link>
        </h1>
      </div>
    </div>
  );
}