import DrawerBody from "./DrawerBody";
import BenchData from "./BenchData";
import BenchOverview from "./BenchOverview";
import BenchPhotos from "./BenchPhotos";
// import { IconContext } from "react-icons";
import styles from "../styles/components/DetailsDrawer.module.css";

export default function DetailsDrawer() {
  return (
    <DrawerBody>
      <div className={styles.bench_data}>
        {" "}
        {/* main container holding data */}
        <div className={styles.bench_information}>
          {" "}
          {/* section above the line break */}
          <BenchData />
          <BenchOverview />
        </div>
        <hr /> {/* line break */}
        <BenchPhotos />
      </div>
    </DrawerBody>
  );
}
