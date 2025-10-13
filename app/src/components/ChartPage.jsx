import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useData } from "../hooks/useData";

const parseSalary = (salary) => {

    return parseInt(salary.replaceAll(",","").replace("$",""))
}

const ChartPage = () => {
  const {data,isLoading} = useData()

  if(isLoading){
    return <div>loading....</div>
  }

  const barData = data.map((d) => ({name: d[0],Salary: parseSalary(d[5]) })).slice(0,10)
  console.log(barData)
  return (
    <div style={{ width: "100%", height: "100vh", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Salary Bar Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Salary" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
