import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
  //const [word, setWord] = useState();
  //const [notFound, setNotFound] = useState(false);
  let { search } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const [word, errorStatus] = useFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );

  console.log(useParams());

  useEffect(() => {
    console.log("word:", word, "errorStatus:", errorStatus);
  });
  /*useEffect(() => {
    //const url = "https://httpstat.us/501";
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        } else if (response.status === 500) {
          setError(true);
        }

        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setWord(data[0].meanings);
        }
      })
      .catch((e) => {
        console.log(e.messgae);
      });
  }, []);
*/

  if (errorStatus === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search </Link>
      </>
    );
  }
  if (errorStatus) {
    return (
      <>
        <p>Something went wrong,try again</p>
        <Link to="/dictionary">Search Again </Link>
      </>
    );
  }

  return (
    <>
      {word?.[0]?.meanings ? (
        <>
          <h1>Here is the definition:</h1>
          {word[0].meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + " :"}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again</p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
