import React, { useRef, useState } from 'react';
import styles from "../styles/Add.module.css";
import useOnClickOutside from './useOnClickOutside';


const Edit = ({products, setEdit}) => {

    // clickOutside custom hook call 
    const domeNode = useRef();
    useOnClickOutside(domeNode, () => setEdit(false))

    const prizeValue = products[0].prices
    const extraOptionText = products[0].extraOptions
    console.log(extraOptionText)

    const [title, setTitle] = useState(products[0].title);
    const [desc, setDesc] = useState(products[0].desc);
    const [prices, setPrices] = useState(prizeValue);
    // const [extraOptions, setExtraOptions] = useState([]);
    // const [extra, setExtra] = useState(null);



    // const {title, desc, img, } = pizzaList[0]
    console.log(products[0])


   

    return (
        <div className={styles.container}>
          <div className={styles.wrapper} ref={domeNode} >
            <span  className={styles.close} onClick = {() => setEdit(false)}>
              X
            </span>
            <h1>Add a new Pizza</h1>
            <div className={styles.item}>
              <label className={styles.label}>Choose an image</label>
              <input type="file"/>
              
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                type="text"
                value={title}
                onChange= {(e) => setTitle(e.target.value)}
               
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Desc</label>
              <textarea
                rows={4}
                type="text"
                value={desc}
                onChange= {(e) => setDesc(e.target.value)}
                
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Prices</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Small"
                  value={prices[0]}
                  onChange= {(e) => setPrices(e.target.value)}
                 
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Medium"
                  value={prices[1]}
                  onChange= {(e) => setPrices(e.target.value)}
                 
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Large"
                  value={prices[2]}
                  onChange= {(e) => setPrices(e.target.value)}
                 
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
            <button className={styles.addButton} >
              Update
            </button>
          </div>
        </div>
      );
}

export default Edit