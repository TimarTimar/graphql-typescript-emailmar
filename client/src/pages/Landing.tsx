import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Message,
	Segment,
} from "semantic-ui-react";
import { tw } from "../TailwindClasses/Buttons";

const Landing = () => {
	return (
		<Container>
			<Message>
				<p>
					Altough every email's from address will be tamasbelinszky@gmail.com,
					feel free to test out all the features.
				</p>
				<p>
					You can get credits if you use one of{" "}
					<a href="https://stripe.com/docs/testing" target="_blank">
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
						<div
							className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
							data-aos="zoom-y-out"
							data-aos-delay="300"
						>
							<div>
								<Link to="/login">Start free trial</Link>
							</div>
							<div>
								<a
									className={tw.button.white}
									href="https://github.com/TimarTimar/ts-emailmar"
								>
									Learn more
								</a>
							</div>
						</div>
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
								<a href="https://github.com/TimarTimar/graphql-typescript-emailmar">
									https://github.com/TimarTimar/graphql-typescript-emailmar
								</a>
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>

			<Segment style={{ padding: "8em 0em" }} vertical>
				<Container text>
					<Header as="h3" style={{ fontSize: "2em" }}>
						Read more about my learning journey
					</Header>
					<p style={{ fontSize: "1.33em" }}>
						Instead of focusing on content creation and hard work, we have
						learned how to master the art of doing nothing by providing massive
						amounts of whitespace and generic content that can seem massive,
						monolithic and worth your attention.
					</p>
					<Button as="a" size="large">
						Read More
					</Button>

					<Divider
						as="h4"
						className="header"
						horizontal
						style={{ margin: "3em 0em", textTransform: "uppercase" }}
					>
						<a href="#">Case Studies</a>
					</Divider>

					<Header as="h3" style={{ fontSize: "2em" }}>
						Did We Tell You About Our Bananas?
					</Header>
					<p style={{ fontSize: "1.33em" }}>
						Yes I know you probably disregarded the earlier boasts as
						non-sequitur filler content, but it's really true. It took years of
						gene splicing and combinatory DNA research, but our bananas can
						really dance.
					</p>
					<Button as="a" size="large">
						I'm Still Quite Interested
					</Button>
				</Container>
			</Segment>
		</Container>
	);
};

export default Landing;
