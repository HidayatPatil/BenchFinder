export default function ContentDrawer() {
  return (
    <div className="drawer_container">
      <div className="drawer_handle">handle</div>
      <div className="bench_data">
        <div className="data_metadata">
          <div className="metadata_name_options">
            <h2>Bench Name</h2>
            <div className="bench_metadata_options">
                {/* <img />  add icons here
                <img />
                <img /> */}
            </div>
          </div>
          <div className="metadata_tags_rating">
            <div className="bench_tags">#lake-view</div>
            <div className="bench_rating">4.5</div>
          </div>
          <p className="metadata_address">
            3700 Willingdon Avenue, Burnaby, BC, Canada V3R 1M2
          </p>
        </div>
        <div className="data_bench_overview">
          <div className="bench_type">
            <h4 className="overview_title">Type</h4>
            <h5 className="overview_content">Wooden</h5>
          </div>
          <div className="bench_cleanliness">
            <h4 className="overview_title">Cleanliness</h4>
            <h5 className="overview_content">Very Clean</h5>
          </div>
          <div className="bench_view">
            <h4 className="overview_title">View</h4>
            <h5 className="overview_content">Good</h5>
          </div>
        </div>
      </div>
      <hr />
      <div className="bench_photos">
        <div className="photos_heading">
          <h3>Photos</h3>
          {/* <img "add plus icon" />  */}
        </div>
        <div className="photos_gallery">
          <div className="gallery_image"></div>
          <div className="gallery_image"></div>
          <div className="gallery_image"></div>
        </div>
      </div>
    </div>
  );
}
