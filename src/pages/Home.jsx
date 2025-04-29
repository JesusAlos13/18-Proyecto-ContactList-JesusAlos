import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { CrearContacto, } from "./CrearContacto.jsx";
import { ContactDelete } from "./EliminarContacto.jsx";
import { useNavigate } from "react-router-dom";




export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	useEffect(() => {
		createAgenda()
		showAgenda()

	}, [])
	const createAgenda = (
		() => {
			fetch('https://playground.4geeks.com/contact/agendas/JesusAlos13', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'JesusAlos13',
					contacts: []
				}),
			})
				.then(response => {
					if (response.status === 400 || response.status === 409)
						return;
					if (!response.ok) {
						console.warn('usuario ya existe');
					}
					return response.json();
				})
				.then(data => {
					console.log('Agenda created:', data);
				})
				.catch(error => {
					console.error('There was a problem with the fetch operation:', error);
				});
		}

	)
	const showAgenda = () => {
		fetch('https://playground.4geeks.com/contact/agendas/JesusAlos13', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log('Agenda fetched:', data);
				dispatch({ type: 'seeContacts', payload: data.contacts });
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	};




	<CrearContacto showAgenda={showAgenda} />
	return (
		<div className="row row-cols-1 row-cols-md-6 g-4 m-2 justify-content-center">
			{store.contacts.map((contact) => (
				<div className="col" key={contact.id}>
					<div className="card cardModel">
						<img
							src="https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
							className="card-img-top imagenAvatar"
							alt="Avatar de contacto"
						/>
						<div className="card-body p-4 text-center">
							<h5 className="card-title d-flex justify-content-center align-items-center mb-3" style={{ fontSize: '1.5rem' }}>
								<i className="fa-solid fa-user fa-lg me-2 text-primary" aria-label="User Icon"></i>
								<span>{contact.name}</span>
							</h5>
							<p className="card-text d-flex justify-content-center align-items-center mb-3">
								<i className="fa-solid fa-house fa-lg me-2 text-success" aria-label="House Icon"></i>
								<span>{contact.address}</span>
							</p>
							<p className="card-text d-flex justify-content-center align-items-center mb-3">
								<i className="fa-solid fa-phone fa-lg me-2 text-warning" aria-label="Phone Icon"></i>
								<span>{contact.phone}</span>
							</p>
							<p className="card-text d-flex justify-content-center align-items-center mb-3">
								<i className="fa-solid fa-envelope fa-lg me-2 text-secondary" aria-label="Envelope Icon"></i>
								<span>{contact.email}</span>
							</p>
							<div className="d-flex justify-content-center align-items-center">
								<button
									type="button"
									className="btn btn-outline-primary me-2"
									onClick={() => navigate(`/editar-contacto/${contact.id}`)}
								>
									<i className="fa-solid fa-pencil"></i>
								</button>
								<ContactDelete id={contact.id} showAgenda={showAgenda} />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};