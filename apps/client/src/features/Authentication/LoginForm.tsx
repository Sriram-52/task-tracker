import { Container, Row, Col, Card, CardBody, Button } from "react-bootstrap";

function App() {
	return (
		<Container fluid>
			<Row className="d-flex justify-content-center align-items-center h-100">
				<Col col="12">
					<Card
						className="bg-white my-5 mx-auto"
						style={{ borderRadius: "1rem", maxWidth: "500px" }}
					>
						<CardBody className="p-5 w-100 d-flex flex-column">
							<h2 className="fw-bold mb-2 text-center">Sign in</h2>
							<p className="text-white-50 mb-3">
								Please enter your login and password!
							</p>

							<input
								className="mb-4 w-100"
								// label="Email address"
								id="formControlLg"
								type="email"
								// size="lg"
							/>
							<input
								className="mb-4 w-100"
								// label="Password"
								id="formControlLg"
								type="password"
								// size="lg"
							/>

							{/* <Checkbox
								name="flexCheck"
								id="flexCheckDefault"
								className="mb-4"
								label="Remember password"
							/> */}

							<Button size="lg">Login</Button>

							<hr className="my-4" />

							<Button
								className="mb-2 w-100"
								size="lg"
								style={{ backgroundColor: "#dd4b39" }}
							>
								{/* <i fab icon="google" className="mx-2" /> */}
								Sign in with google
							</Button>

							<Button
								className="mb-4 w-100"
								size="lg"
								style={{ backgroundColor: "#3b5998" }}
							>
								{/* <Icon fab icon="facebook-f" className="mx-2" /> */}
								Sign in with facebook
							</Button>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
