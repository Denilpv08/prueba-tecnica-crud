import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ onSave, userToEdit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
    },
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    resetForm();
    navigate("/");
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {userToEdit ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </>
  );
};

export default Form;
