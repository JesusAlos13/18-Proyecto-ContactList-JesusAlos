import { useParams, useNavigate } from "react-router-dom";
import { CrearContacto } from "./CrearContacto";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Editcontact = () => {
  const { dispatch, store } = useGlobalReducer();
  const { id } = useParams();
  const [contactoEditado, setContactoEditado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (store?.contacts) {
      const contacto = store.contacts.find((contact) => contact.id === parseInt(id));
      if (contacto) {
        setContactoEditado(contacto);
      }
    }
  }, [id, store]);

  const editarContacto = (nombre, telefono, email, direccion) => {
    fetch(`https://playground.4geeks.com/contact/agendas/JesusAlos13/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nombre, phone: telefono, email, address: direccion }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al editar el contacto');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Contacto editado:', data);


        if (data.contact) {
          dispatch({ type: 'editcontact', payload: data.contact });
        }

        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (

    contactoEditado ? (
      <CrearContacto id={id} editar={editarContacto} contacto={contactoEditado} />
    ) : (
      <p>Cargando...</p>
    )
  );
};

