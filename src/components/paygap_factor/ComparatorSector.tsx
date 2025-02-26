import { Link } from "react-router-dom";

export default function ComparatorSector() {
  const comparatorPara =
    "Many people often find themselves questioning whether their salary \
            truly reflects their efforts and contributions at work. This feeling \
            can stem from noticing differences between their pay and the \
            industry standards or seeing colleagues with similar roles earning \
            more. The thought of being underpaid can lead to frustration and a \
            sense of being undervalued, especially when one is consistently \
            putting in long hours and delivering high-quality work.";

  return (
    <div className="container-flux">
      <div className="row align-items-center justify-content-center sector-height sector-bg-color text-white">
        <div className="col-md-6 col-sm-12 col-12 d-flex flex-column align-items-center px-5">
          <div className="text-justify p-3">
            <p className="fs-6">{comparatorPara}</p>
          </div>
          <h1>Are you underpaid?</h1>
          <Link to="comparator" className="d-grid text-decoration-none">
            <button className="ge-sc-round-button fw-bold" type="button">
              Find out
            </button>
          </Link>
        </div>
        <div className="col-md-6 col-12 d-flex pt-3 mb-0">
          <div className="w-100 h-auto d-flex justify-content-center">
              <img
                className="image-responsive p-2"
                src="https://placehold.co/600x400"
                alt="Stock Image"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
