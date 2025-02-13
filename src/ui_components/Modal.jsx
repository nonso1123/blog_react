const Modal = ({ children, toggleModal }) => {
	function handleToggleModal(e) {
		if (e.target.id === "modal") {
			toggleModal();
		}
	}

	return (
		<div
			id="modal"
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
    flex justify-center items-center z-50 h-screen"
			onClick={handleToggleModal}
		>
			{children}
		</div>
	);
};

export default Modal;
