import React, { useRef, useState, useEffect } from 'react';
import styles from "../styles/Add.module.css";
import useOnClickOutside from './useOnClickOutside';


const Edit = ({setEdit, pizza, setPizza, onFormSubmit}) => {

    // clickOutside custom hook call 
    const domeNode = useRef();
    useOnClickOutside(domeNode, () => setEdit(false))

    function onTextFieldChange(e) {
      setPizza({
        ...pizza,
        [e.target.name]: e.target.value
      })
    }
 
    return (
        <div className={styles.container}>
          <div className={styles.wrapper} ref={domeNode} >
            <span  className={styles.close} onClick = {() => setEdit(false)}>
              X
            </span>
            <h1>Update an existing Pizza</h1>
            <div className={styles.item}>
              <label className={styles.label}>Choose new image</label>
              <input type="file"/>
             
              
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                type="text"
                name='title'
                value={pizza.title}
                onChange={e => onTextFieldChange(e)}
               
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Desc</label>
              <textarea
                rows={4}
                type="text"
                name='desc'
                value={pizza.desc}
                onChange={e => onTextFieldChange(e)}
                
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Prices</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Small"
                  value={pizza.prices[0]} 
                  onChange={e => onTextFieldChange(e, 1)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Medium"
                  value={pizza.prices[1]} 
                  onChange={e => onTextFieldChange(e, 1)}
                 
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Large"
                  value={pizza.prices[2]} 
                  onChange={e => onTextFieldChange(e, 2)}
                 
                 
                />
              </div>
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Extra</label>
              <div className={styles.extra}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="text"
                  placeholder="Item"
                  name="text"
                
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Price"
                  name="price"
                
                />
                
              </div>
              
            </div>
            <button className={styles.addButton} onClick={onFormSubmit}>
              Update
            </button>
          </div>
        </div>
      );
}


// export const getServerSideProps = async ({params}) => {
  

//   const productRes = await axios.get(`${BASE_URL}/api/products/${params.id}`);

//   return {
//       props: {
//           singleProduct: productRes.data,
//       },
//   };
// };

export default Edit