
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new simplified checkout
    navigate("/simple-checkout");
  }, [navigate]);

  return <div>Redirecting to checkout...</div>;
};

export default Checkout;
