import { useEffect, useState } from "react";
import getConfig from 'next/config';
import axios from "axios";
import Head from "next/head";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import FeaturedNew from "../components/FeaturedNew";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

const {publicRuntimeConfig} = getConfig()
const {BASE_URL} = publicRuntimeConfig

export default function Home({ pizzaList, admin }) {

    const [close, setClose] = useState(true);

    useEffect(() => {
        if (!close) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'visible';
    }, [close]);

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

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || ""
    let admin = false

    if(myCookie.token === process.env.TOKEN){
        admin = true
    }

    const res = await axios.get(`${BASE_URL}/api/products`);

    return {
        props: {
            pizzaList: res.data,
            admin
        },
    };
};
