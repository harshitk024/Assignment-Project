import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/authContext";
const Index = () => {
  const { data, isLoading } = useData();
  const [filterData,setFilterData] =  useState([])
  const navigate = useNavigate();
  const {dispatch} = useAuth();


  useEffect(() => {
    if(data){
      setFilterData(data)
    }
  },[data])

  const [input,setInput] = useState("")
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  const handleChange = (e) => {
    setInput(e.target.value)

    console.log(input)

    if(input.length === 1) {
      setFilterData(data)
    } else {
    setFilterData(data.filter((d) => d[0].startsWith(input)))
    }

  }


  const handleLogout = () => {

    dispatch({type: "LOGOUT"})
    localStorage.clear()
    navigate("/login")

  }


  return (
    <div>
      <div className="flex gap-5">
        <div className="text-2xl font-bold">Listing Page</div>
        <div className="ml-auto flex gap-4">
          <button onClick={() => window.open("/chart", "_blank")} className="p-2 bg-blue-500 text-white hover:bg-blue-700">
            Show Bar Chart
          </button>
          <button onClick={() => window.open("/map","_blank")} className="p-2 bg-green-500 text-white hover:bg-green-700">
             Show Map
          </button>
          <button onClick={handleLogout}><LogOut color="red"/></button>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <div className="text-xl">
          <input className="border-1 rounded-2xl p-3 pl-4 font-light" placeholder="Search Name" onChange={handleChange}/>
        </div>
        <ul className="flex flex-col gap-5">
          {filterData.map((d) => (
            <li key={d[0]} className="hover:bg-gray-300 p-5 cursor-pointer">
              <div
                onClick={() => {
                  navigate(`/data/${d[0]}`);
                }}
              >
                <div>{d[0]}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
