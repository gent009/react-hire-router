import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HireForm from "./components/HireForm";

function PersonProfile(props) {
  const { hiredPeople, setHiredPeople } = props;
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://randomuser.me/api/?uuid=${id}`)
      .then((response) => response.json())
      .then((data) => setPerson(data.results[0]));
  }, [id]);

  function handleHire(wage) {
    setHiredPeople([...hiredPeople, { ...person, wage }]);
    navigate("/");
  }

  if (!person) return <p>Loading...</p>;

  return (
    <article>
      <h2>
        {person.name.first} {person.name.last}
      </h2>
      <HireForm person={person} onHire={handleHire} />
    </article>
  );
}

export default PersonProfile;
