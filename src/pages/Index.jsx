import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { Hearts } from "react-loader-spinner";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading ] = useState(false);

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
  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Hearts
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loading}
          />
        </div>
      )}
      <Plus />
    </section>
  );
};

export default Index;
