import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
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
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="font-medium block">
            Note Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-lg border-teal-600 border-2 py-1 w-full rounded-lg"
            placeholder="Enter your title"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="font-medium block">
            Description:
          </label>
          <textarea
            type="text"
            rows={4}
            name="description"
            id="description"
            className="text-lg border-teal-600 border-2 py-1 w-full rounded-lg"
            placeholder="Enter your description here"
          />
        </div>
        <button className="text-white bg-teal-600 py-3 font-medium w-full text-center">
          Save
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
