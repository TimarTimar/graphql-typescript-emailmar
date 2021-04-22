import React from "react";
import { Container, Grid, Header, Message, Segment } from "semantic-ui-react";
import Timeline from "../components/timeline/Timeline";

const Landing = () => {
	return (
		<Container>
			<Message color="teal">
				<p>
					Altough every email's from address will be tamasbelinszky@gmail.com,
					feel free to test out all the features.
				</p>
				<p>
					You can get credits if you use one of{" "}
					<a
						href="https://stripe.com/docs/testing"
						target="_blank"
						rel="noreferrer"
					>
						Stripe's test card number
					</a>
				</p>
			</Message>
			<div className="pt-32 pb-12 md:pt-20 md:pb-20">
				<div className="text-center pb-6 md:pb-4">
					<h1
						className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
						data-aos="zoom-y-out"
					>
						Project {""}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-200">
							emailmar
						</span>
					</h1>
					<div className="max-w-3xl mx-auto">
						<p
							className="text-xl text-gray-600 mb-8"
							data-aos="zoom-y-out"
							data-aos-delay="150"
						>
							This app uses the sendgrid API to send emails. Currently there is
							only one email template which allows recipients to respond to a
							yes/no question. The app tracks the campaign results via
							sendgrid's event webhook.
						</p>
					</div>
				</div>
			</div>

			<Segment style={{ padding: "0em" }} vertical>
				<Grid celled="internally" columns="equal" stackable>
					<Grid.Row textAlign="center">
						<Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
							<Header as="h3" style={{ fontSize: "2em" }}>
								Project's Goal
							</Header>
							<p style={{ fontSize: "1.33em" }}>
								To learn NodeJS+React full-stack web development.
							</p>
						</Grid.Column>
						<Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
							<Header as="h3" style={{ fontSize: "2em" }}>
								Project's Code
							</Header>
							<p style={{ fontSize: "1.33em" }}>
								{/*<Image avatar src='/images/avatar/large/nan.jpg' />*/}
								<a
									href="https://github.com/TimarTimar/graphql-typescript-emailmar"
									target="_blank"
									rel="noreferrer"
								>
									https://github.com/TimarTimar/graphql-typescript-emailmar
								</a>
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
			<Timeline />
		</Container>
	);
};

export default Landing;
