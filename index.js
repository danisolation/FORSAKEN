import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import { Line } from 'react-chartjs-2';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const AIO_KEY = "aio_SHSq53Ktw0oOxm77yXrUWZRm9Rt9";
  const AIO_USERNAME = "tamquattnb123";

  const [DHT20Temp, setDHT20Temp] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const FEED_NAME = "dht20-temp";
        const result = await axios(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
          {
            headers: {
              "X-AIO-Key": AIO_KEY,
            },
          }
        );
        setDHT20Temp(result.data.value);
      };
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [DHT20Humi, setDHT20Humi] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const FEED_NAME = "dht20-humi";
        const result = await axios(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
          {
            headers: {
              "X-AIO-Key": AIO_KEY,
            },
          }
        );
        setDHT20Humi(result.data.value);
      };
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [yoloLight, setYoloLight] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const FEED_NAME = "yolo-light";
        const result = await axios(
          ` https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
          {
            headers: {
              "X-AIO-Key": AIO_KEY,
            },
          }
        );
        setYoloLight(result.data.value);
      };
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [soilMoisture, setSoilMoisture] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const FEED_NAME = "yolo-moisture";
        const result = await axios(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
          {
            headers: {
              "X-AIO-Key": AIO_KEY,
            },
          }
        );
        setSoilMoisture(result.data.value);
      };
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [fanValue, setFanValue] = useState("");
  const fanInputRef = useRef();

  const [servoValue, setServoValue] = useState("");
  const servoInputRef = useRef();

  const handleFanValueSubmit = async () => {
    const FEED_NAME = "yolo-fan";
    try {
      const response = await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`,
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json",
        },
        data: {
          value: fanValue,
        },
      });
      //reset input placeholder and focus again
      setFanValue("");
      fanInputRef.current.focus();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleServoValueSubmit = async () => {
    const FEED_NAME = "yolo-servo";
    try {
      const response = await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`,
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json",
        },
        data: {
          value: servoValue,
        },
      });
      //reset input placeholder and focus again
      setServoValue("");
      servoInputRef.current.focus();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTurnOn = async () => {
    const FEED_NAME = "yolo-pump";
    try {
      const response = await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`,
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json",
        },
        data: {
          value: JSON.stringify(1),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTurnOff = async () => {
    const FEED_NAME = "yolo-pump";
    try {
      const response = await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`,
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json",
        },
        data: {
          value: JSON.stringify(0),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const FEED_NAME = "yolo-temp";
      axios
        .get(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=10`
        )
        .then((response) => {
          const newData = response.data.map((item) => ({
            name: new Date(item.created_at).toLocaleTimeString(),
            temperatureOfChip: item.value,
          }));
          setData(newData);
        })
        .catch((error) => console.error(error));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div>
        {DHT20Temp ? (
          <p>
            The current temperature is{" "}
            <span style={{ color: "blue", fontWeight: "600" }}>
              {DHT20Temp}
            </span>{" "}
            degrees Celsius.
          </p>
        ) : (
          <p>Loading temperature data...</p>
        )}
      </div>

      <div>
        {DHT20Humi ? (
          <p>
            The current humidity is{" "}
            <span style={{ color: "blue", fontWeight: "600" }}>
              {DHT20Humi}
            </span>
            %.
          </p>
        ) : (
          <p>Loading temperature data...</p>
        )}
      </div>

      <div>
        {yoloLight ? (
          <p>
            The current light is{" "}
            <span style={{ color: "blue", fontWeight: "600" }}>
              {yoloLight}
            </span>
            %.
          </p>
        ) : (
          <p>Loading temperature data...</p>
        )}
      </div>

      <div>
        {soilMoisture ? (
          <p>
            The current soil moisture is{" "}
            <span style={{ color: "blue", fontWeight: "600" }}>
              {soilMoisture}
            </span>
            %.
          </p>
        ) : (
          <p>Loading temperature data...</p>
        )}
      </div>

      <div>
        <p>Set the value (from 0% to 100%) for yolo fan</p>
        <input
          type="text"
          value={fanValue}
          ref={fanInputRef}
          onChange={(e) => setFanValue(e.target.value)}
        />
        <button onClick={handleFanValueSubmit}>Set</button>
      </div>

      <div>
        <p>Set the value (from 0° to 180°) for yolo servo</p>
        <input
          type="text"
          value={servoValue}
          ref={servoInputRef}
          onChange={(e) => setServoValue(e.target.value)}
        />
        <button onClick={handleServoValueSubmit}>Set</button>
      </div>

      <div className="my-8">
        <button onClick={handleTurnOn} className="rounded-full bg-red-400">
          Turn on pump
        </button>
        <button
          onClick={handleTurnOff}
          className="rounded-full bg-green-400 ml-2"
        >
          Turn off pump
        </button>
      </div>

      <div>
        <h1>The temperature of the Yolo Chip</h1>
        <LineChart
          width={900}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperatureOfChip"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
}

// import { Fragment } from 'react';
// import { Routes, Route, Link } from 'react-router-dom'
// import { publicRoutes } from '~/routes';
// import { DefaultLayout } from '~/components/Layout';

// function App() {

//   return (
//     <div className='app'>
//       <nav>
//         <ul>
//           <li>
//             <Link to='/'>Home</Link>
//           </li>
//           <li>
//             <Link to='/report'>Report</Link>
//           </li>
//           <li>
//             <Link to='/config'>Config</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         {publicRoutes.map((route, index) => {
//           const Page = route.component;

//           let Layout = DefaultLayout;

//           if (route.layout) {
//             Layout = route.layout;
//           } else if (route.layout === null) {
//             Layout = Fragment;
//           }

//           return <Route key={index} path={route.path} element={<Layout>
//                                                                 <Page />
//                                                               </Layout>} />;
//         })}
//       </Routes>

//     </div>
//   )
// }

export default App;
