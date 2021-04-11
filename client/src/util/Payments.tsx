import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import { tw } from "../TailwindClasses/Buttons";

const Payments = () => {
	const handleToken = async (token: any) => {
		const res = await axios.post("/api/stripe", token);
		console.log(res);
	};
	return (
		<StripeCheckout
			name="Emailmar"
			description="$5 for 5 email credits"
			amount={500}
			token={(token) => handleToken(token)} // submit callback
			stripeKey={
				process.env.REACT_APP_STRIPE_KEY
					? process.env.REACT_APP_STRIPE_KEY
					: "Stripe Key Not Provided"
			}
		>
			<button className={tw.button.white}>Add Credits</button>
		</StripeCheckout>
	);
};

export default Payments;
