import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import getConfig from 'next/config';
import Edit from "../../components/Edit";
import styles from "../../styles/Admin.module.css";
import DeleteModel from "../../components/DeleteModel";

const {publicRuntimeConfig} = getConfig()
const {BASE_URL} = publicRuntimeConfig

const Index = ({ orders, products }) => {

    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparing", "On the Way", "Delivered"];

    const [edit, setEdit] = useState(false)
    const [showDeleteModel, setShowDeleteModel] = useState(false);

    const [pizza, setPizza] = useState({
        title: "",
        desc: "",
        prices: [],
    });

    const idProductRef = useRef();
    const idSingleProductRef = useRef();

  
 
    useEffect(() => {
        if (showDeleteModel || edit) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'visible';
    }, [showDeleteModel, edit]);


    const handleDelete = (id) => {
        setShowDeleteModel(true)
        idProductRef.current = id;
    };

    // delete functionality start  
    const areUSureDelete = async (choose) => {

        if(choose) {
            try {
                const res = await axios.delete(`${BASE_URL}/api/products/${idProductRef.current}`);
                setPizzaList(pizzaList.filter((pizza) => pizza._id !== idProductRef.current));
                setShowDeleteModel(false)
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowDeleteModel(false)
        }
    };
    // delete functionality ends


    const handleEdit = (id) => {
        setEdit(true)
        idSingleProductRef.current = id;
        
    };

    useEffect(() => {
    async function getProduct() {
        try {
            const product = await axios.get(`${BASE_URL}/api/products/${idSingleProductRef.current}`);
            console.log(product.data); 
            setPizza(product.data); 
        } catch (error) {
            console.log("Something is Wrong"); 
        }
    } 
    getProduct();   
    }, [idSingleProductRef]);

    const onFormSubmit = async (e) => {  
        e.preventDefault()
        try {
            await axios.put(`${BASE_URL}/api/products/${idSingleProductRef.current}`, pizza)
            setEdit(false)
            setPizzaList(pizzaList)    
        } catch (error) {
            console.log("Something is Wrong");    
        }
    }

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put(`${BASE_URL}/api/orders/${id}`, {
            status: currentStatus + 1,
        });
        setOrderList([
            res.data,
            ...orderList.filter((order) => order._id !== id),
        ]);
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.item}>
                    <h1 className={styles.title}>Products</h1>
                    <table className={styles.table}>
                        <tbody>
                            <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                            </tr>
                        </tbody>
                        {pizzaList.map((product) => (
                            <tbody key={product._id}>
                                <tr className={styles.trTitle}>
                                    <td>
                                        <Image
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                            alt=""
                                        />
                                    </td>
                                    <td>{product._id.slice(0, 5)}...</td>
                                    <td>{product.title}</td>
                                    <td>₹{product.prices[0]}</td>
                                    <td>
                                        <button className={styles.button} onClick={() => handleEdit(product._id)}>Edit</button>
                                        <button
                                            className={styles.button}
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className={styles.item}>
                    <h1 className={styles.title}>Orders</h1>
                    <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </tbody>
                    {orderList.map((order) => (
                        <tbody key={order._id}>
                        <tr className={styles.trTitle}>
                            <td>{order._id.slice(0, 5)}...</td>
                            <td>{order.customer}</td>
                            <td>₹{order.total}</td>
                            <td>
                            {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                            </td>
                            <td>{status[order.status]}</td>
                            <td>
                            <button onClick={() => handleStatus(order._id)}>
                                Next Stage
                            </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                    </table>
                </div>
            </div>
            {
                edit && <Edit setEdit={setEdit} pizza={pizza} setPizza={setPizza} onFormSubmit={onFormSubmit}/>
            }
            {
                showDeleteModel && <DeleteModel setShowDeleteModel= {setShowDeleteModel}  areUSureDelete={areUSureDelete}/>
            }
        </>
    );
};

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    const productRes = await axios.get(`${BASE_URL}/api/products`);
    const orderRes = await axios.get(`${BASE_URL}/api/orders`);

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        },
    };
};

export default Index;