import FAB from "../components/FAB";
import BenchData from "../components/BenchData";
import BenchPhotos from "../components/BenchPhotos";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bench_home_page">
      <div className="home_title_header">
        <h2>My Benches</h2>
        <FiFilter className="filter_icon" />
      </div>
      <FAB />
      <div className="bench_listings">
        <Link to="/Bench" className="router-link">
          <div className="listing_item">
            <BenchData showOptions={false} />
            <BenchPhotos showHeading={false} />
          </div>
        </Link>
        <hr />
        <Link to="/Bench" className="router-link">
          <div className="listing_item">
            <BenchData showOptions={false} />
            <BenchPhotos showHeading={false} />
          </div>
        </Link>
        <hr />
        <Link to="/Bench" className="router-link">
          <div className="listing_item">
            <BenchData showOptions={false} />
            <BenchPhotos showHeading={false} />
          </div>
        </Link>
        <hr />
      </div>
    </div>
  );
}
