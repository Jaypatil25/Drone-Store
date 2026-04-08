import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({ ...props }) => (
  <Sonner theme="light" className="toaster group" {...props} />
);

export { Toaster, toast };
