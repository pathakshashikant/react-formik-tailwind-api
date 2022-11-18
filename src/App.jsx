import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Form from './Form'


export default function App() {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepsSize = 5;

  const steps = [
    {
      label: 'Register agreement',
      component: <Form handleNext={handleNext} activeStep={activeStep} steps={stepsSize} handleReset={handleReset} />
    },
    {
      label: 'Add products',
      component: <div className='h-60'>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="mt-20">
          <Button onClick={handleNext}>
            {activeStep === stepsSize.length - 1 ? 'Submit' : 'Next'}
          </Button>
          <Button onClick={handleReset} disabled={activeStep < 1}>Cancel</Button>
        </Box></div>
    },
    {
      label: 'Add escalations',

      component: null
    },
    {
      label: 'Forecase generation',

      component: null
    },
    {
      label: 'Review',

      component: null
    },
  ];



  return (

    <Box sx={{ width: '100%' }} className="mt-8">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>


      {activeStep === steps.length ? (
        <section className='px-24'>
          <Typography sx={{ mt: 2, mb: 1 }} className='flex justify-center items-center h-60'>
            Your form has been submitted. Thank you!!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </section>
      ) : (
        <section className='px-24'>
          <div > {steps[activeStep].component}</div>

        </section>
      )}

    </Box>

  );
}


