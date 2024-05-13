"use client";

import {useEffect} from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({error}: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center">
      <h1>Error</h1>
      <h3>Something Went Wrong!</h3>
    </div>
  );
};

export default ErrorState;
