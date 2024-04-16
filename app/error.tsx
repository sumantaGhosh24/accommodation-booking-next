"use client";

import {useEffect} from "react";

import EmptyState from "@/components/empty-state";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({error}: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center">
      <EmptyState title="Error!" subtitle="Something Went Wrong!" />
    </div>
  );
};

export default ErrorState;
