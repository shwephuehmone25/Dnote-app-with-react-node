import { useEffect, useState } from "react";
import Note from "../components/Note";
import { Hearts } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    //console.log(response);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
    //console.log(notes);
  };
  useEffect((_) => {
    getAllNotes();
  }, []);

  /**create custom alert*/
  const customAlert = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap w-full justify-center">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getAllNotes={getAllNotes}
              customAlert={customAlert}
            />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          {loading ? (
            <Hearts
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={loading}
            />
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
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
    </section>
  );
};

export default Index;
