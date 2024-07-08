import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import HireForm from "./components/HireForm";

function PersonProfile(props) {
  const { hiredPeople, setHiredPeople } = props;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [person, setPerson] = useState(location.state?.person || null);

  useEffect(() => {
    if (!person && location.state) {
      setPerson(location.state.person);
    }
  }, [location.state, person]);

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
