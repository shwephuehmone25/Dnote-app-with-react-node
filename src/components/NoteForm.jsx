import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";

import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomErrorMessage from "./CustomErrorMessage";
import { useEffect, useState } from "react";

/**formik custom error message*/
const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const { id } = useParams();

  const getOldNote = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
      if (response.ok) {
        const note = await response.json();
        setOldNote(note);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error fetching old note:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect((_) => {
    if (!isCreate) {
      getOldNote();
    }
  }, [isCreate, id]);

  /**for create*/
  // const initialValues = {
  //   title: "",
  //   content: "",
  // };

  /**for create & update*/
  const initialValues = {
    title: isCreate ? "" : oldNote.title || "",
    content: isCreate ? "" : oldNote.content || "",
    note_id: isCreate ? "" : oldNote._id || "",
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
      .max(100, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
  });

  const submitHandler = async (values) => {
    let API;
    let method;
  
    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create/note`;
      method = "post";
    } else {
      API = `${import.meta.env.VITE_API}/edit/${values.note_id}`;
      method = "put";
    }
  
    try {
      const response = await fetch(API, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        setRedirect(true);
        toast.success("Note updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error while updating note:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };  

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create" : "Edit"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
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
              <CustomErrorMessage name="content" />
            </div>
            <Field type="text" name="note_id" id="note_id" hidden />
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white py-3 px-4 font-medium rounded-full transition-all duration-300 ease-in-out"
              type="submit"
            >
              {isCreate ? "Save" : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
