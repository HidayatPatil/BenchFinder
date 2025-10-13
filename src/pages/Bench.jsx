import DetailsDrawer from "../components/DetailsDrawer";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Bench() {
  return (
    <div className="bench_details_page">
      <Link to="/">
        <FiChevronLeft className="back_to_home" />
      </Link>
      {/* <img /> The google Map API will be used here */}
      <DetailsDrawer />
    </div>
  );
}
