import { useEffect, useState } from "react";
import getConfig from 'next/config';
import ErrorBoundary from "../components/ErrorBoundary"
import axios from "axios";
import Head from "next/head";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import FeaturedNew from "../components/FeaturedNew";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

const {publicRuntimeConfig} = getConfig()
const {BASE_URL} = publicRuntimeConfig

export default function Home({ admin }) {

    const [close, setClose] = useState(true);
    const [pizzaList, setPizzaList] = useState([]);


    useEffect(() => {
        if (!close) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'visible';
    }, [close]);

    useEffect(() => {
        async function getProductList() {
            try {
                const productList = await axios.get(`${BASE_URL}/api/products`);
                console.log(productList.data); 
                setPizzaList(productList.data); 
            } catch (error) {
                console.log("Something is Wrong"); 
            }
        } 
        getProductList();   
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Pizza Restaurant in India</title>
                <meta name="description" content="Best pizza shop in town" />
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <FeaturedNew />
            {admin && <AddButton setClose={setClose} />}
            <PizzaList pizzaList={pizzaList} /> 
            {!close && <Add setClose={setClose} />}
        </div>
    );
}

// export const getStaticProps = async (ctx) => {
//     const myCookie = ctx.req?.cookies || ""
//     let admin = false

//     if(myCookie.token === process.env.TOKEN){
//         admin = true
//     }

//     const res = await axios.get(`${BASE_URL}/api/products`);
//     console.log(res.data)

//     return {
//         props: {
//             pizzaList: res.data,
//             admin
//         }, 
//     };
// };
