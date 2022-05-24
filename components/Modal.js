import React from 'react';
import styles from "../styles/Modal.module.css";


const Modal = ({ shouldShow, onRequestClose, children }) => {
	return shouldShow ? (
		<div className={styles.modalbg} onClick={onRequestClose}>
			<div className={styles.modalbody} onClick={e => e.stopPropagation()}>
				<button onClick={onRequestClose}>Hide Modal</button>
				{children}
			</div>
		</div>
	) : null;
}

export default Modal