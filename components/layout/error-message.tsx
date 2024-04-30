import React, { PropsWithChildren } from "react";
import { Label } from "../ui/label";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <Label className="text-red-500">{children}</Label>;
};

export default ErrorMessage;
