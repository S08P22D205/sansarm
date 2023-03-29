// import React, { useEffect, useState } from 'react';

// const Timer: React.FC = () => {
//   const [seconds, setSeconds] = useState<number>(0);
//   const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

//   useEffect(() => {
//     let timer: number;

//     const startTimer = () => {
//       timer = window.setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);
//     };

//     const requestWakeLock = async () => {
//       if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
//         try {
//           const wl = await navigator.wakeLock.request('screen');
//           setWakeLock(wl);
//           console.log('Wake lock activated');
//         } catch (err) {
//           console.log('Failed to request wake lock:', err);
//         }
//       }
//     };

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible' && wakeLock !== null) {
//         console.log('Wake lock released');
//         wakeLock.release();
//         setWakeLock(null);
//         window.clearInterval(timer);
//       } else if (document.visibilityState === 'hidden' && wakeLock === null) {
//         startTimer();
//         requestWakeLock();
//       }
//     };

//     startTimer();
//     requestWakeLock();
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.clearInterval(timer);
//       if (wakeLock !== null) {
//         console.log('Wake lock released');
//         wakeLock.release();
//         setWakeLock(null);
//         navigator.wakeLock.cancel();
//       }
//     };
//   }, [wakeLock]);

//   return (
//     <div>
//       <p>Seconds: {seconds}</p>
//     </div>
//   );
// };

// export default Timer;
export {};
