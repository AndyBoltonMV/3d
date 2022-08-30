import { useState } from "react";
import { Car } from "./components/Car";
import { Truck } from "./components/Truck";
import "./App.css";

const App = () => {
  const [truckOrCar, setTruckOrCar] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = (e) => {
    setIsClicked(true);
    setTruckOrCar(e.target.value);
  };

  return (
    <div className="App">
      <input type="radio" value="car" onClick={clickHandler} /> Car
      <input type="radio" value="truck" onClick={clickHandler} /> Truck
      {isClicked && (
        <>
          <h1>It's a {truckOrCar}</h1>
          {truckOrCar === "truck" ? <Truck /> : <Car />}
        </>
      )}
    </div>
  );
};

export default App;
