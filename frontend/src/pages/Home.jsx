import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4">
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => window.location.href = "/logout"}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-6">Your Notes</h2>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))
                    ) : (
                        <p className="text-gray-400">No notes available. Create one below!</p>
                    )}
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">Create a New Note</h2>
                <form
                    onSubmit={createNote}
                    className="bg-gray-800 p-8 rounded-3xl shadow-xl space-y-6 max-w-lg mx-auto"
                >
                    <div>
                        <label htmlFor="title" className="block text-base font-medium text-gray-300">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="mt-2 w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-base font-medium text-gray-300">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-2 w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400 min-h-[150px]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 cursor-pointer"
                    >
                        Create Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
