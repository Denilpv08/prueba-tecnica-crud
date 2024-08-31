import ListTable from "./ListTable";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <>
      <Link to="/create" type="button" className="btn btn-primary">
        Agregar
      </Link>
      <ListTable data={props.data} onEdit={props.edit} />
    </>
  );
};

export default List;
