import { ErrorMessage } from "formik";

const CustomErrorMessage = ({ name }) => {
  return (
    <div className="text-red-600 font-mono font-bold">
        <ErrorMessage name={name}/>
        </div>
  );
};

export default CustomErrorMessage;