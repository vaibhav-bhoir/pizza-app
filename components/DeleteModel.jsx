import React, { useRef } from 'react';
import styles from "../styles/Add.module.css";
import useOnClickOutside from './useOnClickOutside';


const DeleteModel = ({areUSureDelete, setShowDeleteModel}) => {

     // clickOutside custom hook call 
     const domeNode = useRef();
     useOnClickOutside(domeNode, () => setShowDeleteModel(false))
 
    return (
        <div className={styles.container}>
          <div className={styles.wrapper} ref={domeNode} >
            <span onClick={() => setShowDeleteModel(false)} className={styles.close}>
            X
            </span>
            <h1>Are you sure ?</h1>
            <div className={styles.item}>
              <p>Do you really want to delete this records ?</p>
            </div>
            <div className={styles.btnWrapper}>
                <button className={styles.cancelButton} onClick={() => areUSureDelete(false)}>
                Cancel 
                </button>
                <button className={styles.deleteButton} onClick={() => areUSureDelete(true)}>
                Delete
                </button>
            </div>
          </div>
        </div>
      );
}

export default DeleteModel