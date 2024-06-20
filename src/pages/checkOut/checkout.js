import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainLayout from '../../components/layouts/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddress from './deliveryAddress';
import Payment from './payment';
import OrderSummary from './orderSummary';
const steps = ['Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const querySearch = new URLSearchParams(location.search);
  const step = parseInt(querySearch.get("step")) || 0;

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    navigate(`/checkout?step=${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    navigate(`/checkout?step=${prevStep}`);
  };

  return (
    <MainLayout>
      <div className='p-2'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
            </React.Fragment>
          ) : ( */}
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
              </Box>
            </React.Fragment>
          {/* )} */}
        </Box>
        {activeStep === 0 && <DeliveryAddress />}
        {activeStep === 1 && <OrderSummary />}
        {activeStep === 2 && <Payment />}
      </div>
    </MainLayout>
  );
}
