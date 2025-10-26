import { useState, useEffect } from "react";
import FAB from "../components/FAB";
import { FiFilter } from "react-icons/fi";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [benches, setBenches] = useState([]);

  useEffect(() => {
    // Load benches from localStorage
    const storedBenches = localStorage.getItem('benches');
    if (storedBenches) {
      try {
        const parsedBenches = JSON.parse(storedBenches);
        setBenches(parsedBenches);
      } catch (error) {
        console.error('Error parsing benches from localStorage:', error);
      }
    }
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="bench_home_page">
      <div className="home_title_header">
        <h2>My Benches ({benches.length})</h2>
        <FiFilter className="filter_icon" />
      </div>
      <FAB />
      <div className="bench_listings">
        {benches.length > 0 ? (
          benches.map((bench) => (
            <ListingItem key={bench.id} benchData={bench} />
          ))
        ) : (
          <div className="no-benches-message">
            No benches added yet. Click the + button to add your first bench!
          </div>
        )}
      </div>
    </div>
  );
}
