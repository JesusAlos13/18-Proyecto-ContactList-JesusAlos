import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store } = useGlobalReducer();
  const { theId } = useParams();
  const contactId = parseInt(theId);  

  const contacto = store.contacts?.find(contact => contact.id === contactId);

  
  if (!contacto) {
    return (
      <div className="container text-center">
        <h1 className="display-4">Contacto no encontrado</h1>
        <Link to="/">
          <button className="btn btn-primary btn-lg mt-3">
            Volver al inicio
          </button>
        </Link>
      </div>
    );
  }

  const { name, email, phone, address, image } = contacto;
  const defaultImage = "ruta/a/imagen/predeterminada.jpg"; 

  return (
    <div className="container text-center">
      <h1 className="display-4">{name}</h1>
      <hr className="my-4" />

      <div className="mb-3">
        <img
          src={image || defaultImage}
          alt={`Imagen de ${name}`}
          className="img-fluid rounded-circle mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Teléfono:</strong> {phone}</p>
        <p><strong>Dirección:</strong> {address}</p>
      </div>

      <Link to="/">
        <button className="btn btn-primary btn-lg">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
};
