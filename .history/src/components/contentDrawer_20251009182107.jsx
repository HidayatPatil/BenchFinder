export default function ContentDrawer(){
    return(
        <div className="drawer_container">
            <div className="drawer_handle">handle</div>
            <div className="bench_data">
                <div className="data_section1"></div>
                <div className="data_bench_overview"></div>
            </div>
            <hr />
            <div className="bench_photos">
                <div className="photos_heading">
                    <h3>Photos</h3>
                </div>
                <div className="photos_gallery"></div>
            </div>
        </div>
    )
}