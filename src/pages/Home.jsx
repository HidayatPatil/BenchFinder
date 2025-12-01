import { useState, useEffect } from "react";
import FAB from "../components/FAB";
import { FiFilter } from "react-icons/fi";
import ListingItem from "../components/ListingItem";

export default function Home() {
    const [benches, setBenches] = useState([]);
    const [filterTag, setFilterTag] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const loadBenches = () => {
        const storedBenches = localStorage.getItem("benches");
        if (storedBenches) {
            try {
                const parsedBenches = JSON.parse(storedBenches);
                setBenches(parsedBenches);
            } catch (error) {
                console.error(
                    "Error parsing benches from localStorage:",
                    error
                );
            }
        } else {
            setBenches([]);
        }
    };

    useEffect(() => {
        loadBenches();

        const handleBenchUpdate = () => {
            loadBenches();
        };

        window.addEventListener("benchesUpdated", handleBenchUpdate);
        window.addEventListener("focus", loadBenches);

        return () => {
            window.removeEventListener("benchesUpdated", handleBenchUpdate);
            window.removeEventListener("focus", loadBenches);
        };
    }, []);

    const filteredBenches = filterTag
        ? benches.filter((bench) => bench.tags?.includes(filterTag))
        : benches;

    return (
        <div className="bench_home_page">
            <div className="home_title_header">
                <h2>My Benches ({filteredBenches.length})</h2>
                <div className="filter_icon_wrapper">
                    <FiFilter
                        className="filter_icon"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    />
                    {isFilterOpen && (
                        <div className="filter_overlay">
                            <label htmlFor="filter">Filter by Tag:</label>
                            <select
                                id="filter"
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}>
                                <option value="">All</option>
                                {[
                                    ...new Set(
                                        benches.flatMap(
                                            (bench) => bench.tags || []
                                        )
                                    ),
                                ].map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
            <FAB />
            <div className="bench_listings">
                {filteredBenches.length > 0 ? (
                    filteredBenches.map((bench) => (
                        <ListingItem key={bench.id} benchData={bench} />
                    ))
                ) : (
                    <div className="no-benches-message">
                        No benches match the selected filter. Click the + button
                        to add a new bench!
                    </div>
                )}
            </div>
        </div>
    );
}
