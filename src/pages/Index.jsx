import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";

const Index = () => {
  const [ notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    //console.log(response);
    const notes = await response.json();
    setNotes(notes);
    //console.log(notes);
  };
  useEffect((_) => {
    getAllNotes();
  }, []);
  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {
        notes.map(note => (<Note key={note._id} note={note} />))
      }
      <Plus />
    </section>
  );
};

export default Index;
