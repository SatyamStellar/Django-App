import React from "react";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="bg-gray-800 p-4 my-4 rounded-lg shadow-md border border-gray-700 transition duration-200 hover:shadow-lg">
            <p className="text-lg font-semibold text-white">{note.title}</p>
            <p className="text-gray-300 mt-2">{note.content}</p>
            <p className="text-gray-500 text-sm mt-2">{formattedDate}</p>
            <button
                className="mt-3 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                onClick={() => onDelete(note.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default Note;
