export default function ContentDrawer(){
    return(
        <div className="drawer_container">
            <div className="drawer_handle">handle</div>
            <div className="bench_data">
                <div className="data_section1"></div>
                <div className="data_bench_overview">
                    <div className="bench_type"></div>
                    <div className="bench_cleanliness"></div>
                    <div className="bench_view"></div>
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
    )
}