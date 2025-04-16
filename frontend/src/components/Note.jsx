import React from "react";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-gray-800 p-6 my-4 rounded-2xl shadow-md border border-gray-700 transition duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-white mb-2">{note.title}</h2>

            <p className="text-gray-300 text-base mb-4">{note.content}</p>

            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">{formattedDate}</p>

                <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Note;
