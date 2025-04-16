import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8"
            >
                <h1 className="text-4xl font-bold text-center text-white">{name}</h1>

                <div className="space-y-6">
                    <input
                        className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    <input
                        className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {loading && (
                    <div className="flex justify-center">
                        <LoadingIndicator />
                    </div>
                )}

                <button
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Processing..." : name}
                </button>

                <div className="text-center">
                    {method === "login" ? (
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/register")}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200"
                            >
                                Register here
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200"
                            >
                                Login here
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Form;
