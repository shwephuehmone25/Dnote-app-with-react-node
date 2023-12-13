import { useEffect, useState } from "react";
import Note from "../components/Note";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes?page=${pageNum}`);
    //console.log(response);
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
    //console.log(notes);
  };
  useEffect((_) => {
    getAllNotes();
  }, []);

  /**pagination*/
  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
          <div className="w-full flex items-center justify-center gap-3">
            {currentPage > 1 && (
              <button
                type="button"
                className=" text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handlePre}
              >
                Prev Page
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                className=" text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handleNext}
              >
                Next Page
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          {loading ? (
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
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
