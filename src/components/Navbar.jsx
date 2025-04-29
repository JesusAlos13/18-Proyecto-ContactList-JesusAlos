import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store } = useGlobalReducer();

	return (
		<nav className="navbar navbar-expand-lg bg-dark shadow-sm py-3">
			<div className="container d-flex justify-content-between align-items-center">
				<Link className="navbar-brand text-light fw-bold fs-4" to="/">
					<i className="bi bi-journal-text me-2"></i>Agenda
				</Link>

				<h5 className="mb-0 text-light d-none d-md-block">
					<i className="bi bi-people-fill me-2"></i>
					Contactos: <span className="badge bg-info text-dark">{store.contacts.length}</span>
				</h5>

				<div className="ml-auto">
					<Link to="/crear-contacto">
						<button className="btn btn-outline-info fw-semibold">
							<i className="bi bi-person-plus-fill me-2"></i>Añadir nuevo contacto
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
