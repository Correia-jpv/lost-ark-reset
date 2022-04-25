import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  )
}

const renderTimeSubtitle = (utc, local) => {
  return (
    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-2 text-center text-md-end">{utc.toString()}</div>
      <div className="pure-u-1 pure-u-md-1-2 text-center text-md-start">{local.toString()}</div>
    </div>
  )
}

const renderCountdown = (startTime, endTime) => {
  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
    trailColor: '#404041',
  }

  const minuteSeconds = 60
  const hourSeconds = 3600
  const daySeconds = 86400

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0
  const getTimeDays = (time) => (time / daySeconds) | 0

  const remainingTime = endTime / 1000 - startTime / 1000
  const days = Math.ceil(remainingTime / daySeconds)
  const daysDuration = days * daySeconds

  return (
    <div className="pure-g text-center center pb-2">
      {(() => {
        if (days > 1) {
          return (
            <div className="timer-wrapper pure-u-1 pure-u-sm-1-2 pure-u-lg-1-4 center">
              <CountdownCircleTimer {...timerProps} colors={['#fa5d00']} initialRemainingTime={remainingTime} duration={daysDuration}>
                {({ elapsedTime, color }) => <span style={{ color }}>{renderTime('days', getTimeDays(daysDuration - elapsedTime))}</span>}
              </CountdownCircleTimer>
            </div>
          )
        }

        return (
          <div className="timer-wrapper pure-u-1 pure-u-sm-1-2 pure-u-lg-1-4 invisible">
            <CountdownCircleTimer {...timerProps} colors={['#fa5d00']} initialRemainingTime={remainingTime} duration={daysDuration}>
              {({ elapsedTime, color }) => <span style={{ color }}>{renderTime('days', getTimeDays(daysDuration - elapsedTime))}</span>}
            </CountdownCircleTimer>
          </div>
        )
      })()}

      <div className="timer-wrapper pure-u-1 pure-u-sm-1-2 pure-u-lg-1-4">
        <CountdownCircleTimer
          {...timerProps}
          colors={['#f99200']}
          trailColor="#404041"
          initialRemainingTime={remainingTime % daySeconds}
          duration={daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
        >
          {({ elapsedTime, color }) => <span style={{ color }}>{renderTime('hours', getTimeHours(daySeconds - elapsedTime))}</span>}
        </CountdownCircleTimer>
      </div>

      <div className="timer-wrapper pure-u-1 pure-u-sm-1-2 pure-u-lg-1-4">
        <CountdownCircleTimer
          {...timerProps}
          colors={['#ba00f9']}
          initialRemainingTime={remainingTime % hourSeconds}
          duration={hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => <span style={{ color }}>{renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}</span>}
        </CountdownCircleTimer>
      </div>

      <div className="timer-wrapper pure-u-1 pure-u-sm-1-2 pure-u-lg-1-4">
        <CountdownCircleTimer
          {...timerProps}
          colors={['#00b0fa']}
          initialRemainingTime={remainingTime % minuteSeconds}
          duration={minuteSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0,
          })}
        >
          {({ elapsedTime, color }) => <span style={{ color }}>{renderTime('seconds', getTimeSeconds(elapsedTime))}</span>}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

const CountdownTimer = (props) => {
  return [renderTimeSubtitle(props.utcString, props.localString), renderCountdown(props.startTime, props.endTime)]
}

export default CountdownTimer
