import { React, useEffect } from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contacListReducer from "../store.js";
import { useNavigate } from "react-router-dom";  // Importa useNavigate

export const CrearContacto = ({ editar, id, contacto }) => {
    const { dispatch } = useGlobalReducer;
    const navigate = useNavigate();  // Declara navigate

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (contacto) {
            setNombre(contacto.name || '');
            setDireccion(contacto.address || '');
            setEmail(contacto.email || '');
            setTelefono(contacto.phone || '');
        }
    }, [contacto]);

    const createContact = () => {
        const data = {
            name: nombre,
            phone: telefono,
            email: email,
            address: direccion,
        };

        fetch('https://playground.4geeks.com/contact/agendas/JesusAlos13/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNombre("");
                setDireccion("");
                setTelefono("");
                setEmail("");
                dispatch({ type: 'seeContacts', payload: data.contacts });
                console.log('Contacto creado:', data);

                // Redirige a Home después de crear el contacto
                navigate('/');  // Redirige a la ruta principal (Home)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editar && id) {
            editar(nombre, telefono, email, direccion);
        } else {
            createContact();
        }

        setNombre("");
        setDireccion("");
        setTelefono("");
        setEmail("");
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{
                minHeight: '100vh',
                padding: '2rem',
                backgroundImage: 'url("https://img.freepik.com/foto-gratis/copias-espacio-escritorio_23-2148519805.jpg?semt=ais_hybrid&w=740")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-4 p-5 w-100" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center fw-bold text-dark">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    {editar ? "Editar" : "Crear"} contacto
                </h2>

                <div className="mb-3">
                    <label htmlFor="inputNombre" className="form-label fw-semibold text-dark">Nombre y apellidos</label>
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        id="inputNombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label fw-semibold text-dark">Dirección</label>
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        id="inputAddress"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">Email</label>
                    <input
                        type="email"
                        className="form-control rounded-pill"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="telefono" className="form-label fw-semibold text-dark">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control rounded-pill"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-dark btn-lg shadow-sm rounded-pill"
                        style={{ letterSpacing: '1px' }}>
                        <i className={`bi ${editar ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
                        {editar ? "Actualizar" : "Crear"} contacto
                    </button>
                </div>
            </form>
        </div>
    );
};
