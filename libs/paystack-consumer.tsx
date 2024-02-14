import React, {forwardRef, useContext, FunctionComponentElement} from 'react';
import PaystackProvider from './paystack-provider';
import {PaystackProps} from './types';
import PaystackContext from './paystack-context';

type PaystackConsumerProps = PaystackProps & {
  children: (arg: Record<string, any>) => any;
  onSuccess?: () => void;
  onClose?: () => void;
}


const PaystackConsumerChild: React.FunctionComponent<{ children: any; ref: any }> = ({ children, ref }) => {
  const { config, initializePayment, onSuccess, onClose } = useContext(PaystackContext);

  const completeInitializePayment = (): void => initializePayment({ config, onSuccess, onClose });
  return children({ initializePayment: completeInitializePayment, ref });
};



// eslint-disable-next-line react/display-name
const PaystackConsumer = forwardRef<any, PaystackConsumerProps>(
  ({ children, onSuccess: paraSuccess, onClose: paraClose, ...others }, ref) => {
    const onSuccess = paraSuccess ? paraSuccess : (): any => null;
    const onClose = paraClose ? paraClose : (): any => null;
    return (
      <PaystackProvider {...others} onSuccess={onSuccess} onClose={onClose}>
        <PaystackConsumerChild ref={ref}>{children}</PaystackConsumerChild>
      </PaystackProvider>
    );
  },
);


export default PaystackConsumer;
