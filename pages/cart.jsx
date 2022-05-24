import { useEffect, useState } from "react";
import getConfig from 'next/config';
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const {publicRuntimeConfig} = getConfig()
const {BASE_URL} = publicRuntimeConfig

const Cart = () => {

  const [open, setOpen ] = useState(false)
  const [cash, setCash ] = useState(false)

  useEffect(() => {
    if (cash) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [cash]);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter()

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };


  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, dispatch, options, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (

    <div className={styles.mainWrapper}>
    {
      cart.quantity === 0 ? 
      <div className={styles.emptyCart}>
          <Image src="/img/emptyCartRed.png" alt="" width="200px" height="200px" />
          <h3>Your cart is empty</h3>
          <p>Looks like you have not added anything to your cart. </p>
      </div>
      :
    
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          {
            cart.products.map((product) => (
                <tbody key={product._id}>
                  <tr className={styles.tr} >
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.img}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{product.title}</span>
                    </td>
                    <td>
                      <span className={styles.extras}>
                        {
                          product.extras.map((extra) => {
                            <span key={extra._id}>{extra.text}, </span>
                          })
                        }
                      </span>
                    </td>
                    <td>
                      <span className={styles.price}>₹{product.price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>{product.quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>₹{product.price * product.quantity}</span>
                    </td>
                  </tr>
                </tbody>
            ))
          }
        </table>
      </div>


      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>₹{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>₹0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>₹{cart.total}
          </div>
          {
            open ? (
              <div className={styles.paymentMethods}>
                  <button className={styles.payBtn} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                  <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AYxwvkm_RkNbpr1WIXDur2vUM7V3hVAMgKJYsezulHOHtI57KREfb11gljNUarBPS3cWl29ZkxbgWWGJ",
                    components: "buttons", 
                    currency: "INR",
                    "disable-funding": "credit,card,p24",
                  }}
              >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
              </div>
            ) : (
              <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
            )
          }
          
        </div>
      </div>

      {
        cash && (
          <OrderDetail total={cart.total} setCash={setCash} createOrder={createOrder}/>
        )
      }
    </div>
  }
    </div>

  );
};

export default Cart;
