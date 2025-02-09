import { useEffect, useState } from 'react';
import { Alert } from "@chakra-ui/react"

interface Props {
  message: string
}

function AlertMessage({ message }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div>
      <Alert.Root status="info" title="This is the alert title">
        <Alert.Indicator />
        <Alert.Title>{message}</Alert.Title>
      </Alert.Root>
    </div>
  )
}

export default AlertMessage