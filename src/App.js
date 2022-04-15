import React, { Suspense } from "react";
import Footer from "./UI/footer";
import "./styles/App.css";

const ResetCountdownTimers = React.lazy(() =>
	import("./UI/resetCountdownTimer")
);

const App = () => {
	return [
		<h1 className="text-center">
			Lost Ark EU/NA weekly and daily reset times and countdown
		</h1>,
		<Suspense fallback={<div className="text-center">Loading timer...</div>}>
			<ResetCountdownTimers />
		</Suspense>,
		<Footer />,
	];
};

export default App;
