import { Link } from "react-router-dom";

const Table = ({ data, onEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Usuario</th>
          <th scope="col">Email</th>
          <th scope="col">Dirección</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address.street}</td>
            <td>
              <Link to={`/update/${user.id}`}>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => onEdit(user)}
                >
                  Editar
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
