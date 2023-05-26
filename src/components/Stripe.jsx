
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NAzFDLPdRylRVj7b9oNrl8uSCs70p7NBdEAVZMo9btoCFxrtOWCVFYsz3yYh9QNFeYaG2zQBuvwT3ZrS3583MeK00twunhv4E")


function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm/>
        </Elements>
    )
}

export default Stripe