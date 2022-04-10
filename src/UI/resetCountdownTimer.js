import React from "react";

import CountdownTimer from "./countdownTimer";

const renderSchema = (weekly, daily) => {
	return (
		<script type="application/ld+json">
			{`
      {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When is the Lost Ark EU/US servers weekly reset?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${weekly}"
      }
    },
    {
      "@type": "Question",
      "name": "When is the Lost Ark EU/US servers daily reset?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${daily}"
      }
    }
  ]
}
`}
		</script>
	);
};


const renderTitle = (title) => {
	return <h2 className="text-center">{title}</h2>;
};

function nextDate(dayIndex) {
	const timeNow = new Date(),
		timeNowUTC = Date.UTC(
			timeNow.getUTCFullYear(),
			timeNow.getUTCMonth(),
			timeNow.getUTCDate(),
			10,
			0,
			0
		),
		today = new Date(timeNowUTC);
	today.setDate(
		today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1
	);
	return today;
}

const ResetCountdownTimers = () => {
	const timeNow = new Date(),
	timeNowUTC = Date.UTC(
			timeNow.getUTCFullYear(),
			timeNow.getUTCMonth(),
			timeNow.getUTCDate(),
			timeNow.getUTCHours(),
			timeNow.getUTCMinutes(),
			timeNow.getUTCSeconds()
			),
			timeResetUTC = Date.UTC(
				timeNow.getUTCFullYear(),
				timeNow.getUTCMonth(),
				timeNow.getUTCDate(),
				10,
				0,
				0
				),
				startTime = new Date(timeNowUTC);
				
				let nextWeeklyReset = new Date(timeResetUTC),
				nextDailyReset = new Date(timeResetUTC);
				
				if (nextWeeklyReset < startTime || nextWeeklyReset.getDay() !== 4) {
					nextWeeklyReset = new Date(nextDate(4));
	}

	if (nextDailyReset < startTime) {
		nextDailyReset = new Date(
			nextDailyReset.setDate(startTime.getDate() + 1)
			);
		}
		
		const localLocale = Intl.DateTimeFormat().resolvedOptions().locale,
		localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
		nextWeeklyResetString = new Intl.DateTimeFormat("default", {
			weekday: "short",
			day: "numeric",
			month: "numeric",
			hour: "numeric",
			timeZone: "UTC",
			timeZoneName: "short",
		}).format(new Date(nextWeeklyReset)),
		nextWeeklyResetLocalString = new Intl.DateTimeFormat(localLocale, {
			weekday: "short",
			day: "numeric",
			month: "numeric",
			hour: "numeric",
			timeZone: localTimezone,
			timeZoneName: "short",
		}).format(new Date(nextWeeklyReset)),
		nextDailyResetString = new Intl.DateTimeFormat("default", {
			hour: "numeric",
			timeZone: "UTC",
			timeZoneName: "short",
		}).format(new Date(nextDailyReset)),
		nextDailyResetLocalString = new Intl.DateTimeFormat(localLocale, {
			hour: "numeric",
			timeZone: localTimezone,
			timeZoneName: "short",
		}).format(new Date(nextDailyReset));
		
		return [
			renderTitle("Weekly reset"),
			<CountdownTimer startTime={startTime} endTime={nextWeeklyReset} utcString={nextWeeklyResetString} localString={nextWeeklyResetLocalString}/>,
			renderTitle("Daily reset"),
			<CountdownTimer startTime={startTime} endTime={nextDailyReset} utcString={nextDailyResetString} localString={nextDailyResetLocalString}/>,
			renderSchema(nextWeeklyResetString, nextDailyResetString),
		];
	};
	export default ResetCountdownTimers;
