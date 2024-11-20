import { useState, useEffect } from "react";
import type { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage
  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem("candidatestore") as string) || [];
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <div>
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <img src={candidate.avatar_url || ""} alt="Avatar" width="100" />
              <h2>{candidate.name || "No Name"}</h2>
              <p>{candidate.bio || "No bio available"}</p>
              <p>Company: {candidate.company || "N/A"}</p>
              <p>Location: {candidate.location || "N/A"}</p>
              {candidate.html_url ? (
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              ) : (
                <p>No GitHub profile available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No saved candidates found.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
