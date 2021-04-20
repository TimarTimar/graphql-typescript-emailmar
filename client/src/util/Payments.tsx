import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/client";
import { PAY_5_USD_MUTATION } from "./graphql";
import { Button, Icon } from "semantic-ui-react";

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
			<Button basic size="big" color="teal">
				<Icon color="teal" name="money bill alternate outline" /> Add credits
			</Button>
		</StripeCheckout>
	);
};

export default Payments;
