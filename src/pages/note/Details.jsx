import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Hearts } from "react-loader-spinner";

const Details = () => {
  const {id} = useParams();
  // console.log(params.id)
  
  const [note, setNote] = useState([]);
  const [loading, setLoading ] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    //console.log(response);
    const note = await response.json();
    setNote(note);
    setLoading(false);
    //console.log(notes);
  };
  useEffect((_) => {
    getNote();
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        <section className="px-10 mt-10 ">
          <div className="text-right">
            <Link
              to={"/"}
              className=" text-teal-600 font-medium border border-teal-600 px-3 py-2"
            >
              Back
            </Link>
          </div>
          <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
          {note.image && (
              <img
                src={`${import.meta.env.VITE_API}/${note.image}`}
                alt={note.title}
                className="my-10 h-64 w-full object-cover"
              />
            )}
            <h3 className="text-3xl font-medium">{note.title}</h3>
            <div className=" flex gap-4 my-2">
              {note.createdAt && note.AuthFormor && (
                <>
                  <p className=" flex items-center gap-1 font-medium text-sm text-gray-600">
                    <UserIcon className=" w-4 h-4" /> {note.AuthFormor.username}
                  </p>
                  <p className=" flex items-center gap-1 font-medium text-sm text-gray-600">
                    <CalendarDaysIcon className=" w-4 h-4" />
                    {format(new Date(note.createdAt), "yyyy-MMM-dd")}
                  </p>
                </>
              )}
            </div>
            <p className="text-base mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
