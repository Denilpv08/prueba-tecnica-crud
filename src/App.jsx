import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import List from "./components/List";
import ListForm from "./components/ListForm";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setData(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          localStorage.setItem("userData", JSON.stringify(data));
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  const handleSave = (user) => {
    if (user.id) {
      setData(data.map((item) => (item.id === user.id ? user : item)));
    } else {
      setData([...data, { ...user, id: data.length + 1 }]);
    }
    setUserToEdit(null);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
            <Link className="nav-item nav-link active" to={"/"}>
              Inicio
            </Link>
          </div>
        </nav>
        <div className="container">
          <br />
          <Routes>
            <Route path="/" element={<List data={data} edit={handleEdit} />} />
            <Route
              path="/create"
              element={<ListForm onSave={handleSave} userToEdit={userToEdit} />}
            />
            <Route
              path="/update/:id"
              element={<ListForm onSave={handleSave} userToEdit={userToEdit} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
