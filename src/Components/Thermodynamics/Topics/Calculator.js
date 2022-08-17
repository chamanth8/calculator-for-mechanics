import React, { useState } from "react";
import "../../PysicsStyles/physicscalculator.css";
import { Form, Button, Modal } from "react-bootstrap";

import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";
import { SI } from "../../Solution/allSIUnits";
import { constant } from "../../Solution/allConstants";
import Solution from "../../Solution/Solution";
import { useParams } from "react-router-dom";

function Calculator() {
  let { topic } = useParams();
  // topics_data
  const Topics = [
    {
      topic: "Efficiency",
      details:
        "Thermal efficiency (ηth) of any heat engine is dimensionless performance measure of a device that use thermal energy, such as internal combustion engine, boiler, furnace etc, and can be defined as the ratio of the work it does (W) and the heat input at the heigh temperature (QH) ",
      formula: [
        "ηth=W/QH,",
        <br />,
        "eff. of carnot engine (η)=(Tₕ-Tc)/Tₕ,",
        <br />,
        "Refrigerator Efficiency = Qc/(Qₕ-Qc).",
      ],
      process:
        "Thermal Efficiency is the ratio of work done (W) and the heat at high temperature(QH). For Carnot engine efficiency is found by the difference between the highest temperature(Tₕ) and lowest temperature(Tc) to  the highest temperature(Tₕ). For refregirator efficiency is found by the heat absorbed(Qₕ) to the difference between heat released(Qc) and heat absorbed(Qₕ).",
      siunit: "NA",
      dimension: "NA",
    },
    {
      topic: "First law",
      details:
        "The first law of thermodynamics states that the change in internal energy (ΔU) of the thermodynamics system is equal to the difference between the amount of heat (Q) applied to the system and the worked done by the system (W) due to this.",
      formula: "ΔU = Q - W",
      process:
        "Basically this is used to find the work done by the thermodynamics system (w) for which we need to be know change in energy (ΔU) after applied the some amount of heat (Q), by putting these values in formula we can easily find any of these.",
      siunit: "joule",
      dimension: "[M L² / T²]",
    },
    {
      topic: "Kinetic Theory of Gases",
      details: `According to the Kinetic Theory of Gases, gaseous particles are constantly moving and collide in completely elastic collisions. In a collection of gas particles, the average kinetic energy is directly proportional to absolute temperature.
  
      According to this theory, the gas molecule is composed of a huge number of tiny molecules compared to the distances between them. The kinetic theory of gases is necessary for clarifying the process of trapping particles by the diffusion mechanism.`,
      formula: "P.V=n.R.T",
      process:
        "The Kinetic theory of gases is based on the Universal Gas Equation and all quantities related to it are derived from this. The required values can be easily found by punching in the other values in the equation and this calculator can very easily do that.",
      siunit:
        "Pressure: N/m² , Volume: m³ , moles: mol , Universal Gas Constant: J/K.mol , Temperature: K  ",
      dimension:
        "Pressure: M¹L⁻¹T⁻², Volume: L³, moles: Mol, Universal Gas Constant: M¹ L² T⁻² K⁻¹, Temperature: K",
    },

    {
      topic: "Second law",
      details:
        "The concept of entropy as a physical attribute of a thermodynamic system is established by the second law of thermodynamics. Despite following the necessity of energy conservation as specified in the first law of thermodynamics, entropy predicts the direction of spontaneous processes and determines whether they are irreversible or impossible. Second law of thermodynamics states that the change in entropy (dS) is defined as the ratio of the heat transfer (dQ) into the system and the temperature (T).",
      formula: "dS=dQ/T",
      process:
        "To find the change in entropy we need to know the heat transfer (dQ) and the temperature (T). Here 'dS' is the change in entropy.",
      siunit: "Entropy: joules per kelvin",
      dimension: "Entropy: [M L² K/ T²]",
    },
    {
      topic: "Third law",
      details:
        "As the temperature approaches absolute zero, the Third Law of Thermodynamics is concerned with the limiting behaviour of systems. Because most thermodynamics calculations rely solely on entropy differences, the entropy scale's zero point is frequently overlooked. The Third Law, on the other hand, is discussed for completeness' sake because it depicts the state of zero entropy.",
      formula: "S=kB log W",
      process:
        "Where S is the entropy, kB is Boltzmann constant and its value is 1.38×10⁻²³ J/K and W is no. of micro states, Put the value of micro states.",
      siunit: "Entropy: Joules per kelvin",
      dimension: "Entropy: [M L² K/ T²]",
    },

    {
      topic: "Thermal Expansion",
      details:
        "Thermal expansion is defined as change in the dimensions(length/area/volume) of a body due to changes in temperature.When solids, liquids and gases are subjected to change in temperature, there is some change in their dimensions.It can be expressed as the fractional change in length or area or volume per unit change in temperature.If The expansion can occurs in length ,it is called Linear Expansion.If The expansion occurs in Area ,it is called Areal Expansion and if it occurs in volume ,it is called Volume Expansion.One of its main applications is: Thermal expansion is the basic principle that a thermometer works on.",
      formula: [
        "For Thermal Expansion:  d",
        <sub>f</sub>,
        "=d",
        <sub>0</sub>,
        "(1+ξ(T",
        <sub>2</sub>,
        "-T",
        <sub>1</sub>,
        "))",
      ],
      process: [
        "To find the change in dimensions of a material due to temperature changes, we make use of the above formuale where the terms are described as follows:",
        <br />,
        "d",
        <sub>f</sub>,
        "  is the final dimension",
        <br />,
        "d",
        <sub>0</sub>,
        "  is the initial dimension",
        <br />,
        "ξ",
        "  is the expansion coefficient",
        <br />,
        "T1 is the initial temperature",
        <br />,
        "T2 is the final temperature",
      ],

      siunit: [
        <br />,
        "For linear expansion:  m",
        <br />,
        "For areal expansion:  m",
        <sup>2</sup>,
        <br />,
        "For volume expansion:  m",
        <sup>3</sup>,
      ],
      dimension: [
        <br />,
        "For linear expansion: L ",
        <br />,
        "For areal expansion:  L",
        <sup>2</sup>,
        <br />,
        "For volume expansion:  L",
        <sup>3</sup>,
      ],
    },
  ];

  const page = Topics.filter((data) => data.topic === topic);
  const details = page[0];

  //Thermal Expansion
  const ThermalExpansion = () => {
    const [result, setResult] = useState(null);
    const [initial, setInitial] = useState(null);
    const [coefficient, setCoefficient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [choice, setChoice] = useState("LinearExpansion");
    const [T1, setT1] = useState(null);
    const [T2, setT2] = useState(null);
    let unit;
    if(choice==="LinearExpansion"){unit= initial + "m";}
   else if(choice==="ArealExpansion"){unit= initial +"m²";}
    else{unit= initial + "m³";}
    const givenValues = {
      initial_dimension: unit,
      coefficient:coefficient,
      T1:`${T1}K`,
     T2: `${T2}K`
    };
    const insertValues= ` ${initial}( 1+ ${coefficient} (${T2} - ${T1}))`;

    function reset() {
      setResult(null);
      setInitial(null);
      setCoefficient(null);
      setShowSolution(false);
      setT1(null);
      setT2(null);
    }
    const handleChange = (e) => { setChoice(e.target.value);
      setInitial(null);
      setCoefficient(null);
      setShowSolution(false);
      setT1(null);
      setT2(null);
      setResult(null);
    };
    const calcResult = () => {let res;
        if (
      initial === null ||
      coefficient === null ||
      T2 === null ||
      T1 === null){
        setShowModal(true);
      } else {if(choice=== "LinearExpansion")
    { res=parseFloat(initial) * (1 + parseFloat(coefficient) * (T2 - T1))+ "m";}
       else if(choice=== "ArealExpansion")
    { res=parseFloat(initial) * (1 + parseFloat(coefficient) * (T2 - T1))+ "m²";}
        else
        {  res=parseFloat(initial) * (1 + parseFloat(coefficient) * (T2 - T1))+ "m³";}
setResult(res);
      setShowSolution(true);}
    };
    return (
      <> <Modal show={showModal} class="modal-dialog modal-dialog-centered">
      <Modal.Header>
        Please enter the values to get correct answer.
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
              onChange={(e) => handleChange(e)}
            >
              <option value="LinearExpansion">Linear Expansion</option>
              <option value="ArealExpansion">Areal Expansion</option>
              <option value="VolumetricExpansion">Volumetric Expansion</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              <strong>
                To find the final dimension, Enter the following values
              </strong>
              <br />
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              Initial Dimension (d<sub>0</sub>)
            </Form.Label>
            <Form.Control
              placeholder="Enter the initial value of dimension"
              value={initial === null ? "" : initial}
              type="number"
              onChange={(e) => {
                setInitial(Number(e.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Expansion Coefficient (ξ)</Form.Label>
            <Form.Control
              placeholder="Enter the Expansion Coefficient"
              value={coefficient === null ? "" : coefficient}
              type="number"
              onChange={(e) => {
                setCoefficient(Number(e.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              Initial Temperature (T<sub>1</sub>)
            </Form.Label>
            <Form.Control
              placeholder="Enter the Initial Temperature"
              value={T1 === null ? "" : T1}
              type="number"
              onChange={(e) => {
                setT1(Number(e.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              Final Temperature (T<sub>2</sub>)
            </Form.Label>
            <Form.Control
              placeholder="Enter the Final Temperature"
              value={T2 === null ? "" : T2}
              type="number"
              onChange={(e) => {
                setT2(Number(e.target.value));
              }}
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="df=d0(1+ξ(T2-T1))"
                toFind="Final Dimension"
                insertValues={insertValues}
                result={result}
                // constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Label>
              Final Dimension (d<sub>f</sub>)
            </Form.Label>
            <Form.Control
              disabled="true"
              type="number"
              placeholder={result === null ? "Final Dimension" : result}
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

  //Third law of thermodynamics
  function CalculatorThirdLaw() {
    const [result, setResult] = useState(null);
    const [microstates, setMicrostates] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    // const [boltzmann, setBoltzmann] = useState(1.38 *Math.pow(10,-23))

    const boltzmann = 1.38 * Math.pow(10, -23);

    const givenValues = {
      microstates: microstates,
      boltzmann: boltzmann,
    };
    const constants = ["boltzmann"];
    const insertValues = `${constant["boltzmann"]} * log(${microstates})${SI["microstates"]} `;

    const handleClick = () => {
      if (microstates != null) {
        let res = boltzmann * Math.log(microstates);
        setResult(res);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
    };
    const resetForm = () => {
      setMicrostates(null);
      setResult(null);
      setShowSolution(false);
    };
    return (
      <React.Fragment>
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
          <Form.Group className="mb-3" controlId="microstates">
            <Form.Label>Number of microstates:</Form.Label>
            <Form.Control
              onChange={(e) => setMicrostates(e.target.value)}
              type="number"
              placeholder="Enter the number of microstates"
              value={microstates === null ? "" : microstates}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="boltzmann">
            <Form.Label>Boltzmann Constant:</Form.Label>
            <Form.Control
              readOnly
              // type="number"
              //value={boltzmann}
              placeholder=" 1.38×10⁻²³ J/K "
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues}
                formula="S=kB * log W"
                toFind="entropy"
                insertValues={insertValues}
                result={result}
                constants={constants}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4" controlId="entropy">
            <Form.Label> Entropy (S)</Form.Label>
            <Form.Control
              readOnly
              type="number"
              placeholder={
                result === null ? "Result" : result + " Joules per kelvin"
              }
            />
            <Form.Text className="text-muted">
              Enter the above values to Calculate.
            </Form.Text>
          </Form.Group>

          <div className="button-custom-grp">
            <Button variant="primary" onClick={handleClick}>
              Calculate
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={resetForm} type="reset">
              Reset
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }

  //Thermal efficiency (ηth) calculator
  const CalculatorEfficiency = () => {
    const [choice, setChoice] = useState("efficiency");
    const [heat, setHeat] = useState(null);
    // const [efficiency, setEfficiency] = useState(null)
    const [work, setWork] = useState(null);
    const [result, setResult] = useState(null);
    const [tempcold, setTempcold] = useState(null);
    const [temphot, setTemphot] = useState(null);
    const [heatabsorb, setheatabsorb] = useState(null);
    const [heatrelease, setheatrelease] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const givenValues = () => {
      if (choice === "efficiency")
        return {
          work: work,
          heat: heat,
        };
      else if (choice === "refrige")
        return {
          heatabsorb: heatabsorb,
          heatrelease: heatrelease,
        };
      else
        return {
          tempcold: tempcold,
          temphot: temphot,
        };
    };
    const resetForm = () => {
      setHeat(null);
      setTemphot(null);
      setTempcold(null);
      setheatrelease(null);
      setheatabsorb(null);
      // setEfficiency(null)
      setWork(null);
      setResult(null);
      setShowSolution(false);
    };
    const handleClick = () => {
      let res;
      if (choice === "efficiency" && work != null && heat != null) {
        res = work / heat;
        setShowSolution(true);
      } else if (
        choice === "refrige" &&
        heatabsorb != null &&
        heatrelease != null
      ) {
        res = heatabsorb / (heatrelease - heatabsorb);
        setShowSolution(true);
      } else if (choice === "carnot" && temphot != null && tempcold != null) {
        res = (temphot - tempcold) / temphot;
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
      setResult(res);
    };
    const choiceData = () => {
      if (choice === "efficiency")
        return {
          name: "Efficiency (η)",
          mainunit: "",
          quantities: ["Work (W)", "Heat at Heigh temperatue (QH)"],
          getters: [work, heat],
          setters: [setWork, setHeat],
          subunits: ["joule", "joule"],
          formula: "work / heat",
          insertValues: ` ${work}${SI["work"]} / ${heat}${SI["heat"]}`,
        };
      else if (choice === "refrige")
        return {
          name: "Refrigerator Efficiency",
          mainunit: "",
          quantities: ["Heat Absorbed(Qc)", "Heat Released(Qh)"],
          getters: [heatabsorb, heatrelease],
          setters: [setheatabsorb, setheatrelease],
          subunits: ["joule", "joule"],
          formula: "heatabsorb / (heatrelease - heatabsorb)",
          insertValues: ` ${heatabsorb}${SI["heatabsorb"]} / (${heatrelease}${SI["heatrelease"]} - ${heatabsorb}${SI["heatabsorb"]})`,
        };
      else if (choice === "carnot")
        return {
          name: "Efficiency of carnot engine percentage",
          mainunit: "",
          quantities: [
            "Temperature of the hot reservoir (Th)",
            "Temperature of the cold reservoir (Tc)",
          ],
          getters: [temphot, tempcold],
          setters: [setTemphot, setTempcold],
          subunits: ["kelvin", "kelvin"],
          formula: "(temphot - tempcold) / temphot",
          insertValues: ` (${temphot}${SI["temphot"]} - ${tempcold}${SI["tempcold"]}) / ${temphot}${SI["temphot"]}`,
        };
    };

    const handleChange = (e) => {
      setChoice(e.target.value);
      resetForm();
    };

    return (
      <React.Fragment>
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
          {/* dropdown */}
          <Form.Group className="mb-4" controlId="choice">
            <Form.Label>Select the type of calculation</Form.Label>
            <Form.Control
              as="select"
              className="select-custom-res"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="efficiency">ηth : Thermal efficiency </option>
              <option value="carnot">η: Efficiency of carnot engine </option>
              <option value="refrige">Refrigerator Efficiency</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              <strong>
                {" "}
                To find the {choiceData().name}, Enter the following values
              </strong>
              <br />
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[0]}</Form.Label>
            <Form.Control
              onChange={(e) => {
                choiceData().setters[0](e.target.value);
              }}
              type="number"
              placeholder={"Enter in " + choiceData().subunits[0]}
              value={
                choiceData().getters[0] === null ? "" : choiceData().getters[0]
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[1]}</Form.Label>
            <Form.Control
              onChange={(e) => {
                choiceData().setters[1](e.target.value);
              }}
              type="number"
              placeholder={"Enter in " + choiceData().subunits[1]}
              value={
                choiceData().getters[1] === null ? "" : choiceData().getters[1]
              }
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues()}
                formula={choiceData().formula}
                toFind={choiceData().name}
                insertValues={choiceData().insertValues}
                result={result}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={
                result === null
                  ? "Result"
                  : result + " " + choiceData().mainunit
              }
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={handleClick}>
            Calculate
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="dark" onClick={() => resetForm()} type="reset">
            Reset
          </Button>
        </div>
      </React.Fragment>
    );
  };

  //Second Law of thermodynamics calculator
  const CalculatorSecondLaw = () => {
    const [choice, setChoice] = useState("entropy");
    const [entropy, setEntropy] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [heat, setHeat] = useState(null);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const handleChange = (e) => {
      setChoice(e.target.value);
      resetForm();
    };
    const givenValues = () => {
      if (choice === "entropy")
        return {
          temperature: temperature,
          heat: heat,
        };
      else if (choice === "heat")
        return {
          entropy: entropy,
          temperature: temperature,
        };
      else
        return {
          entropy: entropy,
          heat: heat,
        };
    };
    const resetForm = () => {
      setHeat(null);
      setEntropy(null);
      setTemperature(null);
      setResult(null);
      setShowSolution(false);
    };

    const handleClick = () => {
      let res;
      if (choice === "entropy" && heat != null && temperature != null) {
        res = parseFloat(heat) / parseFloat(temperature);
        setShowSolution(true);
      } else if (choice === "heat" && entropy != null && temperature != null) {
        res = parseFloat(entropy) * parseFloat(temperature);
        setShowSolution(true);
      } else if (choice === "temperature" && heat != null && entropy != null) {
        res = parseFloat(heat) / parseFloat(entropy);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }

      setResult(res);
    };
    const choiceData = () => {
      if (choice === "entropy") {
        return {
          name: "Change in Entropy (dS)",
          mainunit: "joules per kelvin",
          quantities: ["Heat transfer", "Temprature"],
          getters: [heat, temperature],
          setter: [setHeat, setTemperature],
          subunits: ["joule", "kelvin"],
          formula: "heat / temperature",
          insertValues: `${heat}${SI["heat"]} / ${temperature}${SI["temperature"]}`,
        };
      } else if (choice === "heat") {
        return {
          name: "Heat transfered (dQ)",
          mainunit: "joule",
          quantities: ["Change in Entropy", "Temprature"],
          getters: [entropy, temperature],
          setter: [setEntropy, setTemperature],
          subunits: ["joules per kelvin", "kelvin"],
          formula: "entropy * temperature",
          insertValues: `${entropy}${SI["entropy"]} * ${temperature}${SI["temperature"]}`,
        };
      } else if (choice === "temperature") {
        return {
          name: "Temperature (T)",
          mainunit: "kelvin",
          quantities: ["Heat transfer", "Change in entropy"],
          getters: [heat, entropy],
          setter: [setHeat, setEntropy],
          subunits: ["joule", "joules per kelvin"],
          formula: "heat / entropy",
          insertValues: `${heat}${SI["heat"]} / ${entropy}${SI["entropy"]}`,
        };
      }
    };
    return (
      <React.Fragment>
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
          <Form.Group className="mb-3" controlId="choice2">
            <Form.Label>Select the type of calculation</Form.Label>
            <Form.Control
              as="select"
              className="select-custom-res"
              onChange={(e) => handleChange(e)}
            >
              <option value="entropy">dS: Change in Entropy</option>
              <option value="heat">dQ : Heat transfer</option>
              <option value="temperature">T :Tempreature</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              <strong>
                {" "}
                To find the {choiceData().name}, Enter the following values
              </strong>
              <br />
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[0]}</Form.Label>
            <Form.Control
              onChange={(e) => {
                choiceData().setter[0](e.target.value);
              }}
              type="number"
              placeholder={"Enter in " + choiceData().subunits[0]}
              value={
                choiceData().getters[0] === null ? "" : choiceData().getters[0]
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[1]}</Form.Label>
            <Form.Control
              onChange={(e) => choiceData().setter[1](e.target.value)}
              type="number"
              placeholder={"Enter in " + choiceData().subunits[1]}
              value={
                choiceData().getters[1] === null ? "" : choiceData().getters[1]
              }
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues()}
                formula={choiceData().formula}
                toFind={choiceData().name}
                insertValues={choiceData().insertValues}
                result={result}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={
                result === null
                  ? "Result"
                  : result + " " + choiceData().mainunit
              }
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={handleClick}>
            Calculate
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="dark" onClick={() => resetForm()} type="reset">
            Reset
          </Button>
        </div>
      </React.Fragment>
    );
  };

  //first Law of thermodynamics calculator
  const CalculatorFirstLaw = () => {
    const [choice, setChoice] = useState("energy");
    const [heat, setHeat] = useState(null);
    const [work, setWork] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const handleChange = (e) => {
      setChoice(e.target.value);
      resetForm();
    };

    const resetForm = () => {
      setEnergy(null);
      setHeat(null);
      setWork(null);
      setResult(null);
      setShowSolution(false);
    };

    const givenValues = () => {
      if (choice === "energy")
        return {
          work: work,
          heat: heat,
        };
      else if (choice === "work")
        return {
          energy: energy,
          heat: heat,
        };
      else
        return {
          energy: energy,
          work: work,
        };
    };
    const handleClick = () => {
      let res;
      if (choice === "energy" && heat != null && work != null) {
        res = parseFloat(heat) - parseFloat(work);
        setShowSolution(true);
      } else if (choice === "work" && heat != null && energy != null) {
        setShowSolution(true);
        res = parseFloat(heat) - parseFloat(energy);
      } else if (choice === "heat" && energy != null && work != null) {
        res = parseFloat(energy) + parseFloat(work);
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
      setResult(res);
    };

    const choiceData = () => {
      if (choice === "energy") {
        return {
          name: "Change in energy",
          quantities: ["Amount of heat (Q)", "Work done by System (W)"],
          mainunit: "joule",
          setters: [setHeat, setWork],
          getters: [heat, work],
          formula: "heat - work",
          insertValues: `${heat}${SI["heat"]} - ${work}${SI["work"]}`,
        };
      } else if (choice === "heat") {
        return {
          name: "The amount of heat",
          quantities: ["Work done by System (W)", "Change in energy (∆U)"],
          mainunit: "joule",
          setters: [setWork, setEnergy],
          getters: [work, energy],
          formula: "energy + work",
          insertValues: `${energy}${SI["energy"]} + ${work}${SI["work"]}`,
        };
      } else if (choice === "work")
        return {
          name: "Work done by the system",
          quantities: ["Amount of heat (Q)", "Change in energy (∆U)"],
          mainunit: "joule",
          setters: [setHeat, setEnergy],
          getters: [heat, energy],
          formula: "heat - energy",
          insertValues: `${heat}${SI["heat"]} - ${energy}${SI["energy"]}`,
        };
    };
    return (
      <React.Fragment>
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
          {/* dropdown */}
          <Form.Group className="mb-4" controlId="choice">
            <Form.Label>Select the type of calculation</Form.Label>
            <Form.Control
              as="select"
              className="select-custom-res"
              onChange={(e) => handleChange(e)}
            >
              <option value="energy">∆U : Change in energy</option>
              <option value="heat">Q: Amount of heat</option>
              <option value="work">W: Work done by system</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              <strong>
                {" "}
                To find the {choiceData().name}, Enter the following values
              </strong>
              <br />
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[0]}</Form.Label>
            <Form.Control
              onChange={(e) => choiceData().setters[0](e.target.value)}
              type="number"
              placeholder={"Enter in " + choiceData().mainunit}
              value={
                choiceData().getters[0] === null ? "" : choiceData().getters[0]
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{choiceData().quantities[1]}</Form.Label>
            <Form.Control
              onChange={(e) => choiceData().setters[1](e.target.value)}
              type="number"
              placeholder={"Enter in " + choiceData().mainunit}
              value={
                choiceData().getters[1] === null ? "" : choiceData().getters[1]
              }
            />
          </Form.Group>
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues()}
                formula={choiceData().formula}
                toFind={choiceData().name}
                insertValues={choiceData().insertValues}
                result={result}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={
                result === null
                  ? "Result"
                  : result + " " + choiceData().mainunit
              }
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={handleClick}>
            Calculate
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="dark" onClick={() => resetForm()} type="reset">
            Reset
          </Button>
        </div>
      </React.Fragment>
    );
  };

  // KTG calculator
  function CalculatorKTG() {
    const [result, setResult] = useState(null);
    const [gasCon, setGasCon] = useState("8.3145");
    const [moles, setMoles] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [volume, setVolume] = useState(null);
    const [molarMass, setMolarMass] = useState(null);
    const [freedom, setFreedom] = useState(null);
    const [choice, setChoice] = useState("ke");
    const [showModal, setShowModal] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const givenValues = () => {
      if (choice === "ke")
        return {
          moles: moles,
          temperature: temperature,
          gasCon: gasCon,
        };
      else if (choice === "rms")
        return {
          molarMass: molarMass,
          temperature: temperature,
          gasCon: gasCon,
        };
      else if (choice === "av")
        return {
          molarMass: molarMass,
          temperature: temperature,
          gasCon: gasCon,
        };
      else if (choice === "mp")
        return {
          molarMass: molarMass,
          temperature: temperature,
          gasCon: gasCon,
        };
      else if (choice === "p")
        return {
          moles: moles,
          temperature: temperature,
          volume: volume,
        };
      else if (choice === "v")
        return {
          moles: moles,
          temperature: temperature,
          pressure: pressure,
        };
      else if (choice === "t")
        return {
          moles: moles,
          pressure: pressure,
          volume: volume,
        };
      else
        return {
          freedom: freedom,
          moles: moles,
          temperature: temperature,
        };
    };

    function handleChange(e) {
      resetForm();
      setChoice(e.target.value);
    }

    const choiceData = () => {
      if (choice === "ke")
        return {
          name: "Kinetic Energy",
          mainunit: "Joules",
          quantities: [
            "Number of Moles",
            "Temprature",
            "Universal Gas Constant",
          ],
          subunits: ["mol", "K", "J.K¯¹⋅mol¯¹"],
          setters: [setMoles, setTemperature, setGasCon],
          getters: [moles, temperature, gasCon],
          formula: "1.5 * gasCon * moles * temperature",
          insertValues: `1.5 * 8.3145 * ${moles}${SI["moles"]} * ${temperature}${SI["temperature"]}`,
        };
      else if (choice === "rms")
        return {
          name: "RMS Velocity",
          mainunit: "m/s",
          quantities: ["Molar Mass", "Temperature", "Universal Gas Constant"],
          subunits: ["g⋅mol¯¹", "K", "J.K¯¹⋅mol¯¹"],
          setters: [setMolarMass, setTemperature, setGasCon],
          getters: [molarMass, temperature, gasCon],
          formula: "((3 * gasCon * temperature) / molarMass) ** 0.5",
          insertValues: `(3 * 8.3145 * ${temperature}${SI["temperature"]} / ${molarMass}${SI["molarMass"]}) ** 0.5`,
        };
      else if (choice === "av")
        return {
          name: "Average Velocity",
          mainunit: "m/s",
          quantities: ["Molar Mass", "Temperature", "Universal Gas Constant"],
          subunits: ["g⋅mol¯¹", "K", "J.K¯¹⋅mol¯¹"],
          setters: [setMolarMass, setTemperature, setGasCon],
          getters: [molarMass, temperature, gasCon],
          formula:
            "((8 * gasCon * temperature) / (Math.PI * molarMass)) ** 0.5",
          insertValues: `(8 * 8.3145 * ${temperature}${SI["temperature"]} / Math.PI * ${molarMass}${SI["molarMass"]}) ** 0.5`,
        };
      else if (choice === "mp")
        return {
          name: "Most Probable Velocity",
          mainunit: "m/s",
          quantities: ["Molar Mass", "Temperature", "Universal Gas Constant"],
          subunits: ["g⋅mol¯¹", "K", "J.K¯¹⋅mol¯¹"],
          setters: [setMolarMass, setTemperature, setGasCon],
          getters: [molarMass, temperature, gasCon],
          formula: "((2 * gasCon * temperature) / molarMass) ** 0.5",
          insertValues: `(2 * 8.3145 * ${temperature}${SI["temperature"]} / ${molarMass}${SI["molarMass"]}) ** 0.5`,
        };
      else if (choice === "p")
        return {
          name: "Pressure",
          mainunit: "Pa",
          quantities: ["Number of Moles", "Temperature", "Volume"],
          subunits: ["mol", "K", "m³"],
          setters: [setMoles, setTemperature, setVolume],
          getters: [moles, temperature, volume],
          formula: "(8.3145 * moles * temperature) / volume",
          insertValues: `(8.3145 * ${moles}${SI["moles"]} * ${temperature}${SI["temperature"]}) / ${volume}${SI["volume"]}`,
        };
      else if (choice === "v")
        return {
          name: "Volume",
          mainunit: "m³",
          quantities: ["Number of Moles", "Temperature", "Pressure"],
          subunits: ["mol", "K", "Pa"],
          setters: [setMoles, setTemperature, setPressure],
          getters: [moles, temperature, pressure],
          formula: "(8.3145 * moles * temperature) / pressure;",
          insertValues: `(8.3145 * ${moles}${SI["moles"]} * ${temperature}${SI["temperature"]}) / ${pressure}${SI["pressure"]}`,
        };
      else if (choice === "t")
        return {
          name: "Temperature",
          mainunit: "K",
          quantities: ["Number of Moles", "Pressure", "Volume"],
          subunits: ["mol", "Pa", "m³"],
          setters: [setMoles, setPressure, setVolume],
          getters: [moles, pressure, volume],
          formula: "(pressure * volume) / (8.3145 * moles)",
          insertValues: `(${pressure}${SI["pressure"]} * ${volume}${SI["volume"]}) / (8.3145 * ${moles}${SI["moles"]})`,
        };
      else if (choice === "u")
        return {
          name: "Internal Energy",
          mainunit: "Joules",
          quantities: ["freedom", "Temperature", "No of Moles"],
          subunits: ["NaN", "K", "mol"],
          setters: [setFreedom, setTemperature, setMoles],
          getters: [freedom, temperature, moles],
          formula: "(8.3145 * temperature * freedom * moles) / 2",
          insertValues: `(8.3145 * ${temperature}${SI["temperature"]} * ${moles}${SI["moles"]} * ${freedom}${SI["freedom"]}) / 2`,
        };
    };

    const handleClick = () => {
      let res;
      // setGasCon(8.3145);
      if (choice === "ke" && moles != null && temperature != null) {
        res = 1.5 * gasCon * moles * temperature;
        setShowSolution(true);
      } else if (choice === "rms" && temperature != null && molarMass != null) {
        res = (parseFloat(3 * gasCon * temperature) / molarMass) ** 0.5;
        setShowSolution(true);
      } else if (choice === "av" && temperature != null && molarMass != null) {
        res =
          (parseFloat(8 * gasCon * temperature) /
            parseFloat(Math.PI * molarMass)) **
          0.5;
        setShowSolution(true);
      } else if (choice === "mp" && temperature != null && molarMass != null) {
        res = (parseFloat(2 * gasCon * temperature) / molarMass) ** 0.5;
        setShowSolution(true);
      } else if (
        choice === "p" &&
        moles != null &&
        temperature != null &&
        volume != null
      ) {
        res = (8.3145 * moles * temperature) / volume;
        setShowSolution(true);
      } else if (
        choice === "v" &&
        moles != null &&
        temperature != null &&
        pressure != null
      ) {
        res = (8.3145 * moles * temperature) / pressure;
        setShowSolution(true);
      } else if (
        choice === "t" &&
        pressure != null &&
        volume != null &&
        moles != null
      ) {
        res = parseFloat(pressure * volume) / parseFloat(moles * 8.3145);
        setShowSolution(true);
      } else if (
        choice === "u" &&
        freedom != null &&
        moles != null &&
        temperature != null
      ) {
        res = (freedom * moles * 8.3145 * temperature) / 2;
        setShowSolution(true);
      } else {
        setShowModal(true);
      }
      setResult(res);
    };
    function resetForm() {
      setResult(null);
      setMoles(null);
      setTemperature(null);
      setMolarMass(null);
      setPressure(null);
      setVolume(null);
      setFreedom(null);
      setShowSolution(false);
    }
    return (
      <React.Fragment>
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
              onChange={(e) => handleChange(e)}
            >
              <option value="ke">
                KE : Total translational kinetic energy of gas
              </option>
              <option value="rms">Vᵣₘₛ : RMS speed</option>
              <option value="av">Vₐᵥ : Average velocity</option>
              <option value="mp">Vₘₚ : Most probable velocity</option>
              <option value="p">P : Pressure of gas</option>
              <option value="v">V : Volume of gas</option>
              <option value="t">T : Temperature of gas</option>
              <option value="u">U : Internal energy</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="text">
            <Form.Text className="text">
              <strong>
                {" "}
                To find the {choiceData().name}, Enter the following values
              </strong>
              <br />
            </Form.Text>
          </Form.Group>
          {choice === "p" ||
            choice === "v" ||
            choice === "t" ||
            choice === "u" ? (
            <>
              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[0]}</Form.Label>
                <Form.Control
                  onChange={(e) => choiceData().setters[0](e.target.value)}
                  type="number"
                  placeholder={"Enter in " + choiceData().subunits[0]}
                  value={
                    choiceData().getters[0] === null
                      ? ""
                      : choiceData().getters[0]
                  }
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[1]}</Form.Label>
                <Form.Control
                  onChange={(e) => choiceData().setters[1](e.target.value)}
                  type="number"
                  placeholder={"Enter in " + choiceData().subunits[1]}
                  value={
                    choiceData().getters[1] === null
                      ? ""
                      : choiceData().getters[1]
                  }
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[2]}</Form.Label>
                <Form.Control
                  className="K_energy"
                  onChange={(e) => choiceData().setters[2](e.target.value)}
                  type="number"
                  placeholder={"Enter in " + choiceData().subunits[2]}
                  value={
                    choiceData().getters[2] === null
                      ? ""
                      : choiceData().getters[2]
                  }
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[0]}</Form.Label>
                <Form.Control
                  onChange={(e) => choiceData().setters[0](e.target.value)}
                  type="number"
                  placeholder={"Enter in " + choiceData().subunits[0]}
                  value={
                    choiceData().getters[0] === null
                      ? ""
                      : choiceData().getters[0]
                  }
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[1]}</Form.Label>
                <Form.Control
                  onChange={(e) => choiceData().setters[1](e.target.value)}
                  type="number"
                  placeholder={"Enter in " + choiceData().subunits[1]}
                  value={
                    choiceData().getters[1] === null
                      ? ""
                      : choiceData().getters[1]
                  }
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>{choiceData().quantities[2]}</Form.Label>
                <Form.Control
                  className="K_energy"
                  onChange={(e) => choiceData().setters[2](e.target.value)}
                  type="number"
                  readOnly
                  placeholder={"Enter in " + choiceData().subunits[2]}
                  value={
                    choiceData().getters[2] === null
                      ? ""
                      : choiceData().getters[2]
                  }
                />
              </Form.Group>
            </>
          )}
          {showSolution ? (
            <Form.Group className="mb-3" controlId="acceleration">
              <Solution
                givenValues={givenValues()}
                formula={choiceData().formula}
                toFind={choiceData().name}
                insertValues={choiceData().insertValues}
                result={result}
              />
            </Form.Group>
          ) : null}
          <Form.Group className="mb-4">
            <Form.Control
              readOnly
              type="number"
              placeholder={
                result === null
                  ? "Result"
                  : result + " " + choiceData().mainunit
              }
            />
          </Form.Group>
        </Form>
        <div className="button-custom-grp">
          <Button variant="primary" onClick={handleClick}>
            Calculate
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="dark" type="reset" onClick={() => resetForm()}>
            Reset
          </Button>
        </div>
      </React.Fragment>
    );
  }

  //adding the calculators togather
  function calC(key) {
    let currentCall;
    switch (key) {
      case "Kinetic Theory of Gases":
        currentCall = CalculatorKTG();
        break;
      case "First law":
        currentCall = CalculatorFirstLaw();
        break;
      case "Second law":
        currentCall = CalculatorSecondLaw();
        break;
      case "Efficiency":
        currentCall = CalculatorEfficiency();
        break;
      case "Third law":
        currentCall = CalculatorThirdLaw();
        break;
      case "Thermal Expansion":
        currentCall = ThermalExpansion();
        break;
      default:
        break;
    }
    return currentCall;
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className="Calculator__main">
        <Helmet>
          <title>{details.topic}</title>
          <meta name="description" content="{details.details}" />
          <meta
            name="keywords"
            content="Thermodynamics, thermo, calculator, Thermodynamics calculator, thermo calculator, first law, second law, third law, entropy,efficiency,calculator, physics, Tech n science, technscience, tech and science"
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
        <div className="Calculator__process">
          <h3> Process</h3>
          <p>{details.process}</p>
        </div>
        <div className="Calculator__calc">
          <h3>{details.topic} Calculator</h3>
          <hr />
          {calC(details.topic)}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Calculator;
