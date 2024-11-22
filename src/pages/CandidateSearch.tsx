import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import type { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch: React.FC = () => {
  const [currentcandidate, setcurrentcandidate] = useState<Candidate>({
    id: null,
    login: null,
    email: null,
    html_url: null,
    name: null,
    avatar_url: null,
    bio: null,
    company: null,
    location: null,
  });
  const [results, setresults] = useState<Candidate[]>([]);
  const [index, setindex] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const allcandidates: Candidate[] =
    JSON.parse(localStorage.getItem("candidatestore") as string) || [];
  // Function to get all candidates
  const searchgitallusers = async () => {
    const returndata: Candidate[] = await searchGithub();
    setresults(returndata);
    if (returndata.length > 0) setcurrentcandidate(returndata[0]);
  };

  // Function to get a specific candidate by username
  const specificuser = async (nameofuser: string) => {
    const returndata: Candidate = await searchGithubUser(nameofuser);
    setcurrentcandidate(returndata);
  };

  // Function to handle candidate selection
  const handleSelection = (action: "skip" | "save") => {
    if (action === "save") {
      console.log("Candidate saved:", currentcandidate);
      allcandidates.push(currentcandidate);
      localStorage.setItem("candidatestore", JSON.stringify(allcandidates));
    }
    const nextIndex = index + 1;
    if (nextIndex < results.length) {
      setindex(nextIndex);
      setcurrentcandidate(results[nextIndex]);
    } else {
      console.log("End of candidates");
    }
  };

  // Handle search for specific user
  const handleSearch = () => {
    specificuser(username);
  };

  useEffect(() => {
    searchgitallusers();
  }, []);

  return (
    <div>
      <h1>CandidateSearch</h1>

      {/* Input field to search specific user */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search by GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      {currentcandidate && (
        <div className="candidate-card">
          <img
            src={currentcandidate.avatar_url || ""}
            alt="Avatar"
            width="100"
          />
          <h2>{currentcandidate.name || "No Name"}</h2>
          <p>{currentcandidate.bio || "No bio available"}</p>
          <p>Company: {currentcandidate.company || "N/A"}</p>
          <p>Location: {currentcandidate.location || "N/A"}</p>

          {currentcandidate.html_url ? (
            <a
              href={currentcandidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          ) : (
            <p>No GitHub profile available</p>
          )}

          <div>
            <button onClick={() => handleSelection("save")}>Save</button>
            <button onClick={() => handleSelection("skip")}>Skip</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
