import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;

  return (
    <nav>
      <h1>
        <Link to="/" id="logo">
          Candidate Tracker
        </Link>
      </h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <h2>
            <Link
              to="/CandidateSearch"
              className={
                currentPage === "/CandidateSearch"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Candidate Search
            </Link>
          </h2>
        </li>
        <li className="nav-item">
          <h2>
            <Link
              to="/SavedCandidates"
              className={
                currentPage === "/SavedCandidates"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Saved Candidates
            </Link>
          </h2>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
