import { Link } from "react-router-dom";
import "./Logo.css";

function Logo({ mini }) {
    return (
        <Link to="/" className="logo">
            <div>
                <div></div>
            </div>
        </Link>
    );
}

export default Logo;
