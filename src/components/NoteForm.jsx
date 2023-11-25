import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";
import * as Yup from "yup";

/**formik custom error message*/
const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };
  /**validation with formik validate*/
  // const validate = (values) => {
  //   const errors = {};
  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must have at least 10 length";
  //   }

  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must have at least 10 length";
  //   }

  //   return errors;
  // };

  /**validation with formik validation schema*/
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
  });

  const submithandler = (values) => {
    console.log(values);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create" : "Edit"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      {/* <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submithandler}
      > */}
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submithandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="font-medium block">
                Note Title:
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="text-lg border-teal-600 border-2 py-1 w-full rounded-lg"
                placeholder="Enter your title"
              />
              {/* {errors.title && touched.title && <p>{errors.title}</p>} */}
              <CustomErrorMessage name="title" />
            </div>
            <div className="">
              <label htmlFor="content" className="font-medium block">
                Content:
              </label>
              <Field
                as="textarea"
                type="text"
                rows={4}
                name="content"
                id="content"
                className="text-lg border-teal-600 border-2 py-1 w-full rounded-lg"
                placeholder="Enter your content here"
              />
              {/* {errors.content && touched.content && <p>{errors.content}</p>} */}
              <CustomErrorMessage name="content" />
            </div>
            <button
              className="text-white bg-teal-600 py-3 font-medium w-full text-center"
              type="submit"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
