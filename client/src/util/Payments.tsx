import React, { useContext, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";

import { tw } from "../TailwindClasses/Buttons";
import { AuthContext } from "../context/auth";

const Payments = (props: any) => {
	/*const handleToken = async (token: any) => {
		const res = await axios.post("/api/stripe", token);
		console.log(res);
	};*/
	const context = useContext(AuthContext);
	const [myToken, setMyToken] = useState("");
	const [handleToken, {}] = useMutation(PAY_5_USD_MUTATION, {
		variables: {
			token: myToken,
		},
	});
	const wrapHandlaToken = async (token: any) => {
		console.log(token, "token");
		const { id } = token;
		console.log(id);
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

const PAY_5_USD_MUTATION = gql`
	mutation pay5usd($token: String!) {
		pay5usd(token: $token) {
			id
			credits
		}
	}
`;

export default Payments;
