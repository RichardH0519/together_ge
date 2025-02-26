import guideLogo from "../../assets/negotiation_guide.png";
import robotLogo from "../../assets/mr_ge.png";

export default function NegotiationSector() {
  return (
    <div className="container-flux">
      <div className="row align-items-center justify-content-evenly sector-height">
        <div className="col-md-2 text-center d-grid">
          <div>
            <img src={guideLogo} alt="GuideLogo" width="400" height="300" />
          </div>
          <p className="pt-3 mb-2">Negotiation techniques for landing higher salary.</p>
          <a className="d-grid text-decoration-none p-2" href="#">
            <button type="button" className="ge-ng-round-button fw-bold">
              Learn more
            </button>
          </a>
        </div>
        <div className="col-md-2 text-center d-grid">
          <div>
            <img src={robotLogo} alt="RobotLogo" width="200" height="300" />
          </div>
          <p className="pt-3 mb-2">Mr. GE will help you practice.</p>
          <a className="d-grid text-decoration-none p-2" href="#">
            <button type="button" className="ge-ng-round-button fw-bold">
              Try Mr. GE
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
