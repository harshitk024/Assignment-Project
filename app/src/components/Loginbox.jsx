import { useState } from "react";
import LoginService from "../services/auth"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const Loginbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch} = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const result = await LoginService.login(loginInput)

    if (result !== undefined) {

        dispatch({type: "LOGIN", payload: {...loginInput,isAuthenticated: true}})
        navigate("/")
    } else {
        window.alert("Login failed")
    }

    setLoginInput({
        username: "",
        password: ""
    })

    setIsLoading(false)

  }

   const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });


  return (
    <div className="flex flex-col items-center justify-center ">
      <div className=" flex flex-col p-5 items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <div className="text-2xl">Welcome Back</div>
          </div>
        </div>

        <form className="flex flex-col gap-2 mt-5">
          <input
            placeholder="Enter username"
            value={loginInput.username}
            onChange={(e) =>
              setLoginInput({ ...loginInput, username: e.target.value })
            }
            className="p-3 rounded-2xl border-gray-300 border-1"
          />
          <input
            placeholder="Enter Password"
            type="password"
            value={loginInput.password}
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
            className="p-3 rounded-2xl border-gray-300 border-1"
          />
          <button
            type="submit"
            className="bg-violet-700 mt-4 text-white px-10 py-3 rounded-xl hover:bg-secondary-500 flex justify-center gap-8"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="6"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isLoading ? null : "Submit"}
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Loginbox;
