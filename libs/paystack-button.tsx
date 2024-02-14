import React, { ReactNode } from 'react';
import usePaystackPayment from './use-paystack';
import { callback, PaystackProps } from './types';

type PaystackButtonProps<T extends PaystackProps> = T & {
  text?: string;
  className?: string;
  children?: ReactNode;
  onSuccess?: callback;
  onClose?: callback;
};

const PaystackButton: <T extends PaystackProps>({
  text,
  className,
  children,
  onSuccess,
  onClose,
  ...config
}: PaystackButtonProps<T>) => JSX.Element = ({
  text,
  className,
  children,
  onSuccess,
  onClose,
  ...config
}) => {
  const initializePayment = usePaystackPayment<T>(config);

  return (
    <button
      className={className}
      onClick={(): void => initializePayment({ config, onSuccess, onClose })}
    >
      {text || children}
    </button>
  );
};

export default PaystackButton;
