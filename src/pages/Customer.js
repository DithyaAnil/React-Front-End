import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!customer) return;
    if (!tempCustomer) return;
    console.log("customer", tempCustomer);
    let equal = true;
    if (customer.name !== tempCustomer.name) {
      equal = false;
    }
    if (customer.industry !== tempCustomer.industry) {
      equal = false;
    }
    if (equal) {
      setChanged(false);
    }
  });

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        if (!response.ok) {
          console.log("response", response);
          throw new Error("something went wrong,try again later");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) throw new Error("something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
        setError(undefined);
      })
      .catch((e) => {
        console.log("e", e);
        setError(e.message);
      });
  }
  return (
    <div className="p-2">
      {notFound ? <p>The customer with id {id} was not found </p> : null}
      {customer ? (
        <div>
          <form
            className="w-full max-w-sm "
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label for="name">Name</label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <>
              <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                form="customer"
              >
                Save
              </button>
            </>
          ) : null}

          <div className=" m-2">
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                const url = baseUrl + "api/customers/" + id;
                fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                  },
                })
                  .then((response) => {
                    if (response.status === 401) {
                      navigate("/login");
                    }
                    if (!response.ok) {
                      throw new Error("something went wrong");
                    }
                    navigate("/customers/");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers/">
        <button className="no-underline bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
}
