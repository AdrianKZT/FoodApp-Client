
import React, {useState} from 'react';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c40ff",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill" : { color: "black"},
            "::placeholder::" : { color: "black"},
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "black",
        }
    }
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error) {
            try {
                const { id } = paymentMethod
                const res = await axios.post("http://localhost:5000/payment", {
                    amount: 10000,
                    id
                })

                if(res.data.success) {
                    console.log("Successful Payment")
                    setSuccess(true)
                }
            } catch (e) {
                console.log("Error", e)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <div>
            {!success ? 
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardNumberElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardExpiryElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardCvcElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
            :
                <div className="payment-success">
                    <h2>Payment successful</h2>
                    <h3 className='Thank-you'>Thank you for your patronage</h3>
                </div>
    }
        </div>
    )
}