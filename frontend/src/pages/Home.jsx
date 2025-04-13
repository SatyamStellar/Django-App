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
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Notes</h2>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Create a Note</h2>
                <form
                    onSubmit={createNote}
                    className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4 max-w-lg mx-auto"
                >
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400 min-h-[120px]"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
}

export default Home;
