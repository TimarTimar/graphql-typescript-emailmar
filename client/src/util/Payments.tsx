import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/client";
import { tw } from "../TailwindClasses/Buttons";
import { PAY_5_USD_MUTATION } from "./graphql";

const Payments = () => {
	const [myToken, setMyToken] = useState("");
	const [handleToken] = useMutation(PAY_5_USD_MUTATION, {
		variables: {
			token: myToken,
		},
	});
	const wrapHandlaToken = async (token: any) => {
		const { id } = token;
		setMyToken(id);
		await handleToken();
		window.location.assign("/surveys");
	};
	return (
		<StripeCheckout
			name="Emailmar"
			description="$5 for 5 email credits"
			amount={500}
			token={(token) => wrapHandlaToken(token)} // submit callback
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
