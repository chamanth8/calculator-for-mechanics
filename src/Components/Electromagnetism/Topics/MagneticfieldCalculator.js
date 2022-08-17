import React, { useState } from "react";
import '../../PysicsStyles/physicscalculator.css'
import { Form, Button } from "react-bootstrap";

import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";
import Solution from "../../Solution/Solution";
import { constant } from "../../Solution/allConstants";
import { SI } from "../../Solution/allSIUnits";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";

function MagneticfieldCalculator() {
  let { topic } = useParams();
  //magneticfield_data
  const magneticfield_data = [
    {
      topic: "Infinite Sheet",
      details:
        "Consider an infinite vertical sheet carrying current out of the page. The sheet has a uniform current per unit length J₀. The magnetic field (B) produced due to current sheet due to a charge density(J₀) can be calculated using Ampere's Law. So the magnetic field produced is μ₀J₀/2.",
      formula: "B= μ₀*J₀/2",
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹ ",
      process:
        "To find the magnetic field(B) for a infinite sheet  we need to know the current density (J₀) and then applying Ampere's Law we can determine the magnetic field. ",
    },
    {
      topic: "Infinite Wire",
      details:
        "The magnetic field of a long straight wire has more implications than one might first suspect. Each current segment generates a magnetic field similar to that of a long straight wire, and the overall field of any shape current is equal to the vector sum of the fields generated by each segment.  Because the wire is so long, the magnitude of the field is determined only by the distance r from the wire, rather than its location along the line.",
      formula: "B = μ₀I/2πr",
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹",
      process:
        "To find the magnetic field(B) for an infinite wire  we need to know the current density (I), shortest distance to the wire (r) and then applying Biot Savart's Law we can determine the magnetic field. ",
    },
    {
      topic: "Solenoid",
      details:
        "Outside the solenoid, the field is radially uniform or constant. The flux density outside the solenoid may likewise be shown to be zero using an intuitive reasoning. Magnetic field lines can only exist as loops; unlike electric field lines, they cannot diverge or converge to a point. Because the magnetic field lines in the solenoid follow a longitudinal course, the magnetic field lines outside the solenoid must proceed in the opposite direction. This occurs as a result of the lines creating a loop. The volume outside the solenoid, on the other hand, is significantly larger than the volume within. As a result, the density of magnetic field lines outside the solenoid is significantly reduced. As a result, the field outside the solenoid can be said to be constant. For the total number of field lines to be conserved, the field outside must go to zero as the solenoid gets longer. ",
      formula: "B=μ₀*N*I",
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹ ",
      process:
        "To find the magnetic field for the solenoid we need to know the no. of turns (N) and the current in solenoid (I) where as μ₀ is constant and it's value is 4π*10⁻⁷ Henry/m",
    },
    {
      topic: "Solid Cylinder",
      details: [
        "Consider a solid cylinder of radius(R) carrying current (i) along its length. The cylinder has a uniform current density. The magnetic field (B) due to the solid cylinder can be calculated for three cases:",
        <br />,
        "1) If r < R, the magnetic field is given by the formula B=μ₀ir/2πR²",
        <br />,
        "2) If r = R, the magnetic field is given by the formula B=μ₀i/2πR",
        <br />,
        "3) If r > R, the magnetic field is given by the formula B=μ₀i/2πr",
        <br />,
        <br />,
        "where 'r' is the distance from the axis of the solid cylinder.",
      ],
      formula: [
        "Inside(r < R): B=μ₀ir/2πR²",
        <br />,
        "At Surface (r = R): B=µ₀i/2πR",
        <br />,
        "Outside(r > R): B=µ₀i/2πr",
      ],
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹ ",
      process:
        "To find the magnetic field(B) for a solid cylinder we need to know its radius(R), the current(I) flowing along its length and a distance from the axis(r). ",
    },
    {
      topic: "Toroid",
      details:
        "Consider a hollow circular ring with N number of turns of the carrying current wire. The magnetic field (B) produced  due to current (I) at point P (inside toroid) with radius (r) can be calculated using Ampere's Law. So the magnetic field produced is  μ₀NI/2πr.",
      formula: "B= μ₀NI/2πr",
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹ ",
      process:
        "To find the magnetic field(B) for the points inside the toroid we need to know the total number of turns (N), current in the loop (I) and radius of the loop (r) and then by applying Ampere's Law we can determine the magnetic field for the points inside the toroid. ",
    },
    {
      topic: "Circular coil",
      details:
        "Consider a circular coil  with N number of turns of the carrying current wire. The magnetic field (B) produced  due to current (I) at the center with radius (r) can be calculated using Ampere's Law. So the magnetic field produced is  μ₀NI/2r.",
      formula: "B= μ₀NI/2r",
      siunit: "Tesla",
      dimension: "MT⁻²I⁻¹ ",
      process:
        "To find the magnetic field(B) at the centre of circular coil we need to know the total number of turns (N), current in the loop (I) and radius of the loop (r) and then by applying Ampere's Law we can determine the magnetic field at hte centre of circular coil. ",
    },
  ];

  const page = magneticfield_data.filter((data) => data.topic === topic);
  const details = page[0];

  //magnetic field for Finite Length Solenoid
  const Finite_Length_Solenoid = () => {
    const [turns, setTurns] = useState(null);
    const [current, setCurrent] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * Math.PI * Math.pow(10, -7);
    const reset = () => {
      setTurns(null);
      setCurrent(null);
      setResult(null);
      setShowSolution(false);
    };
    const calcResult = () => {
      if (turns !== null && current !== null) {
        let res;
        res = μ * turns * current;
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };

    const insertValues = `(${constant["Magnetic_Permeability"]} * ${turns}${SI["number"]} * ${current}${SI["Current"]})`;
    const constants = ["Magnetic_Permeability"];

    const givenValues = {
      Turns: turns,
      Current: current,
    };

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label> Number of turns(N)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTurns(e.target.value);
              }}
              placeholder="Enter the no. of turns (N)"
              value={turns === null ? "" : turns}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Current (I)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrent(e.target.value);
              }}
              placeholder="Enter the current in (Ampere)"
              value={current === null ? "" : current}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="μ₀*N*I"
                toFind="Magnetic Field by the Solenoid"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult}>
            Calculate
          </Button>

          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };
  //circular coil
  const Circular_coil = () => {
    const [turns, setTurns] = useState(null);
    const [radius, setRadius] = useState(null);
    const [current, setCurrent] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * Math.PI * Math.pow(10, -7);
    const reset = () => {
      setTurns(null);
      setRadius(null);
      setCurrent(null);
      setResult(null);
      setShowSolution(false);
    };
    const calcResult = () => {
      if (turns !== null && current !== null && radius !== null) {
        let res;
        res = (μ * turns * current) / (2 * radius);
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };

    const givenValues = {
      Current: current,
      Turns: turns,
      Radius: radius,
    };

    const insertValues = `(${constant["Magnetic_Permeability"]} * ${turns}${SI["number"]} * ${current}${SI["Current"]}) / (2 * ${radius}${SI["Radius"]})`;
    const constants = ["Magnetic_Permeability"];

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label> Number of turns(N)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTurns(e.target.value);
              }}
              placeholder="Enter the no. of turns (N)"
              value={turns === null ? "" : turns}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Current (I)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrent(e.target.value);
              }}
              placeholder="Enter the value of current"
              value={current === null ? "" : current}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Radius (r)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setRadius(e.target.value);
              }}
              placeholder="Enter the value of radius"
              value={radius === null ? "" : radius}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="μ₀NI/2r"
                toFind="Magnetic Field by the Circular Coil"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult}>
            Calculate
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };
  // Toroid
  const Toroid = () => {
    const [turns, setTurns] = useState(null);
    const [radius, setRadius] = useState(null);
    const [current, setCurrent] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * Math.PI * Math.pow(10, -7);
    const reset = () => {
      setTurns(null);
      setRadius(null);
      setCurrent(null);
      setResult(null);
      setShowSolution(false);
    };
    const calcResult = () => {
      if (turns !== null && current !== null && radius !== null) {
        let res;
        res = (μ * turns * current) / (2 * Math.PI * radius);
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };

    const givenValues = {
      Current: current,
      Turns: turns,
      Radius: radius,
    };

    const insertValues = `(${constant["Magnetic_Permeability"]} * ${turns}${SI["number"]} * ${current}${SI["Current"]}) / (2 * π * ${radius}${SI["Radius"]})`;
    const constants = ["Magnetic_Permeability"];

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label> Number of turns(N)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTurns(e.target.value);
              }}
              placeholder="Enter the no. of turns (N)"
              value={turns === null ? "" : turns}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Current (I)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrent(e.target.value);
              }}
              placeholder="Enter the value of current"
              value={current === null ? "" : current}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Radius (r)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setRadius(e.target.value);
              }}
              placeholder="Enter the value of radius"
              value={radius === null ? "" : radius}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="μ₀NI/2πr"
                toFind="Magnetic Field by the Toroid"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult}>
            Calculate
          </Button>

          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };

  //magnetic field for infinite sheet
  const Infinite_sheet = () => {
    const [currentdensity, setCurrentDensity] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * 3.14 * Math.pow(10, -7);
    const reset = () => {
      setResult(null);
      setCurrentDensity(null);
      setShowSolution(false);
    };
    const calcResult = () => {
      if (currentdensity !== null) {
        let res;
        res = (μ * currentdensity) / 2;
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };

    const givenValues = {
      Current_Density: currentdensity,
    };

    const insertValues = `(${constant["Magnetic_Permeability"]} * ${currentdensity}${SI["Current_Density"]}) / 2`;
    const constants = ["Magnetic_Permeability"];

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label> Current Density (J₀)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrentDensity(e.target.value);
              }}
              placeholder="Enter the current density "
              value={currentdensity === null ? "" : currentdensity}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="μ₀J₀/2"
                toFind="Magnetic Field by the Infinite Sheet"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult}>
            Calculate
          </Button>

          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };

  //solid cylinder
  const SolidCylinder = () => {
    const [choice, setChoice] = useState("InCylinder");
    const [current, setCurrent] = useState(null);
    const [radius, setradius] = useState(null);
    const [distance, setDistance] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * 3.14 * Math.pow(10, -7);
    const reset = () => {
      setResult(null);
      setCurrent(null);
      setradius(null);
      setDistance(null);
      setShowSolution(false);
    };
    const handleChange = (e) => {
      setChoice(e.target.value);
      reset();
    };
    const calcResult1 = () => {
      let res;
      if (
        choice === "InCylinder" &&
        current !== null &&
        radius !== null &&
        distance !== null
      ) {
        res = (μ * current * distance) / (2 * Math.PI * Math.pow(radius, 2));
        setShowSolution(true);
      } else if (
        choice === "OutsideCylinder" &&
        current !== null &&
        distance !== null
      ) {
        res = (μ * current) / (2 * Math.PI * distance);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
      setResult(res);
    };

    const givenValues = () => {
      if (choice === "InCylinder") {
        return {
          Current: current,
          Radius: radius,
          Distance: distance,
        };
      } else {
        return {
          Current: current,
          Distance: distance,
        };
      }
    };

    const formula = () => {
      if (choice === "InCylinder") {
        return {
          value: "μ₀ir/2πR²",
        };
      } else {
        return {
          value: "µ₀i/2πr",
        };
      }
    };

    const insertValues = () => {
      if (choice === "InCylinder") {
        return `(${constant["Magnetic_Permeability"]} * ${current}${SI["Current"]} * ${distance}${SI["Distance"]}) / (2 * π * ${radius}${SI["Radius"]}²)`;
      } else {
        return `(${constant["Magnetic_Permeability"]} * ${current}${SI["Current"]}) / (2 * π * ${distance}${SI["Distance"]})`;
      }
    };
    const constants = ["Magnetic_Permeability"];

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4" controlId="choice">
            <Form.Label>Select the type of calculation</Form.Label>
            <Form.Control
              as="select"
              className="select-custom-res"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="InCylinder">
                Magnetic Field inside the Solid Cylinder
              </option>
              <option value="OutsideCylinder">
                Magnetic Field outside or at the surface the Solid Cylinder
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              {choice === "InCylinder" ? (
                <strong>
                  To find the Magnetic Field inside or at the surface the Solid
                  Cylinder, Enter the following values
                </strong>
              ) : (
                <strong>
                  To find the Magnetic Field outside the Solid Cylinder, Enter
                  the following values
                </strong>
              )}

              <br />
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Current(I)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrent(e.target.value);
              }}
              placeholder="Enter the current(A)"
              value={current === null ? "" : current}
            />
          </Form.Group>
          {choice === "InCylinder" && (
            <Form.Group className="mb-4">
              <Form.Label>Radius(R)</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setradius(e.target.value);
                }}
                placeholder="Enter the radius(m)"
                value={radius === null ? "" : radius}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-4">
            <Form.Label>Distance(r)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              placeholder="Enter the distance from the axis(m)"
              value={distance === null ? "" : distance}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues()}
                formula={formula().value}
                toFind="Magnetic Field by the Solid Cylinder"
                insertValues={insertValues()}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult1}>
            Calculate
          </Button>

          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };

  // magnetic field due to infinite wire
  const Infinite_wire = () => {
    const [current, setCurrent] = useState(null);
    const [distance, setDistance] = useState(null);
    const [result, setResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const μ = 4 * 3.14 * Math.pow(10, -7);

    const reset = () => {
      setResult(null);
      setCurrent(null);
      setDistance(null);
      setShowSolution(false);
    };
    const calcResult = () => {
      if (current !== null && distance !== null) {
        let res;
        res = (μ * current) / (2 * Math.PI * distance);
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };

    const givenValues = {
      Distance: distance,
      Current: current,
    };

    const insertValues = `(${constant["Magnetic_Permeability"]} * ${current}${SI["Current"]}) / (2 * π * ${distance}${SI["Distance"]})`;
    const constants = ["Magnetic_Permeability"];

    return (
      <>
        <Modal show={showModal} class="modal-dialog modal-dialog-centered">
          <Modal.Header>
            Please Enter all values to get Proper answer
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              class="btn btn-primary btn-sm"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label> Current (I)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setCurrent(e.target.value);
              }}
              placeholder="Enter in amperes"
              value={current === null ? "" : current}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label> Distance (r)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              placeholder="Enter in amperes"
              value={distance === null ? "" : distance}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Constant (μ₀)</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              placeholder={"4π*10⁻⁷ Henry/m"}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="μ₀I/2πr"
                toFind="Magnetic Field by the Infinite Wire"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={result === null ? "Result" : `${result} T`}
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={calcResult}>
            Calculate
          </Button>

          <Button variant="dark" onClick={() => reset()} type="reset">
            Reset
          </Button>
        </div>
      </>
    );
  };

  const calC = (key) => {
    let currentCall;
    switch (key) {
      case "Infinite Sheet":
        currentCall = Infinite_sheet();
        break;
      case "Infinite Wire":
        currentCall = Infinite_wire();
        break;
      case "Solenoid":
        currentCall = Finite_Length_Solenoid();
        break;
      case "Solid Cylinder":
        currentCall = SolidCylinder();
        break;
      case "Toroid":
        currentCall = Toroid();
        break;
      case "Circular coil":
        currentCall = Circular_coil();
        break;
      default:
        break;
    }
    return currentCall;
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="Calculator__main">
        <Helmet>
          <title>{details.topic}</title>
          <meta
            name="description"
            content={details.details}
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content="Electromagnetism, calculator, physics, Tech n science, technscience, tech and science"
          />
        </Helmet>
        <div className="Calculator__header">
          <h1>{details.topic}</h1>
        </div>
        <div className="Calculator__details">
          <p>{details.details}</p>
        </div>
        <div className="Calculator__formula">
          <h3>Working Formula:</h3>
          <h3>{details.formula}</h3>
          <h3>S.I. Unit : {details.siunit}</h3>
          <h3>Dimension : {details.dimension}</h3>
        </div>
        <div className="Calculator__calc">
          <h3>{details.topic} Calculator</h3>
          <hr />
          {calC(details.topic)}
        </div>
        <div className="Calculator__process">
          <h3> Process</h3>
          <p>{details.process}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MagneticfieldCalculator;