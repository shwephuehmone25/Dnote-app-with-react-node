import { useContext, useEffect, useRef, useState } from "react";

import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// fromik custom error message
import CustomErrorMessage from "./CustomErrorMessage";
import { UserContext } from "../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
  const { token } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

  const { id } = useParams();

  const getOldNote = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.ok) {
        const note = await response.json();
        setOldNote(note);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error fetching old note:", error);
    }
  };

  useEffect(() => {
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
    image: isCreate ? "" : oldNote.image || "",
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

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

   /**validation with formik validation schema*/
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
    image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  /**preview image before upload*/
  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("image", selectedImage);
    }
  };

  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("image", null);

    fileRef.current.value = "";
  };

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
  
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    formData.append("note_id", values.note_id);
  
    try {
      const response = await fetch(API, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
  
      if (response.ok) {
        setRedirect(true);
        toast.success("Note is updated successfully!", {
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
  

  if (redirect) 
  {
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className=" font-medium block">
              Title:
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="Enter your title"
              />
              <CustomErrorMessage name="title" />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className=" font-medium block" >
              Content:
              </label>
              <Field
                as="textarea"
                rows={4}
                type="text"
                name="content"
                id="content"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="Enter your content here"
              />
              <CustomErrorMessage name="content" />
            </div>
            <div className="mb-3">
              <div className=" flex items-center justify-between">
                <label htmlFor="image" className=" font-medium block">
                  Cover image
                  <span className=" text-xs font-medium text-yellow-400">*optional</span>
                </label>
                {previewImg && (
                  <p
                    className="text-base font-medium cursor-pointer text-teal-600"
                    onClick={(_) => {
                      clearPreviewImg(setFieldValue);
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              {isUpload ? (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={(_) => setIsUpload(false)}
                >
                  disable cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={(_) => setIsUpload(true)}
                >
                  upload cover image
                </p>
              )}
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      handleImageChange(e, setFieldValue);
                    }}
                  />
                  <div
                    className=" border border-teal-600 flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                    {isCreate ? (
                      <>
                        {previewImg && (
                          <img
                            src={previewImg}
                            alt={"preview"}
                            className=" w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={
                          previewImg
                            ? previewImg
                            : `${import.meta.env.VITE_API}/${
                                oldNote.image
                              }`
                        }
                        alt={"preview"}
                        className=" w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                      />
                    )}
                  </div>
                </>
              )}
              <CustomErrorMessage name="image" />
            </div>
            <button
              className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
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