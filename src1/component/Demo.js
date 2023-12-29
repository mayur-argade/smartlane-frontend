import React, { useState } from "react";
import Joyride from "react-joyride";

const Demo = () => {
  const [runTour, setRunTour] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const handleTourStart = () => {
    setRunTour(true);
  };

  const handleJoyrideCallback = (data) => {
    if (data.action === "start") {
      setTourStepIndex(0);
    }
  };

  return (
    <div>
      <button onClick={handleTourStart}>Start Tour</button>
      <Joyride
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#fff",
            overlayColor: "#404040",
            primaryColor: "mediumaquamarine",
            textColor: "#333",
            width: 450,
            zIndex: 1000,
          },
        }}
        steps={steps}
        run={runTour}
        continuous={true}
        showProgress={true}
        stepIndex={tourStepIndex}
        showSkipButton={true}
        callback={handleJoyrideCallback}
      />
    </div>
  );
};

export default Demo;

const steps = [
  {
    target: ".one",
    content:
      "See how the overall value of your portfolio rises and falls with real-time updates.",
  },
  {
    target: ".two",
    content:
      "View your debt/equity ratio and monthly net income across your portfolio.",
  },
  {
    target: ".three",
    content: "Add a new property by clicking this button.",
  },
];
