import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className="w-3/5 border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">
        It happened on Medium: October roundup
      </h3>
      <p className="text-sm">
        October’s most-read stories, most-highlighted sentences, and updates for
        writers — In the three months I’ve worked at Medium, I’ve answered the
        question “what’s your favorite part of your new job?” too
      </p>
      <div className="flex items-center justify-end gap-2">
        <TrashIcon width={20} className="text-red-600" />
        <Link to={"/edit/1"}>
          <PencilSquareIcon width={20} className="text-green-600" />
        </Link>
        <Link to={"/note/1"}>
        <EyeIcon width={20} className="text-blue-600" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
