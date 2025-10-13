
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const getfrequencies = (loc) => {


    const freqMap = new Map();
    const result = []

    for(let i = 0; i  < loc.length;i++){

        if(freqMap.has(loc[i].name)){
            let freq = freqMap.get(loc[i].name)
            freqMap.set(loc[i].name,freq + 1)
        } else {
            freqMap.set(loc[i].name,1)
        }
    }

    freqMap.forEach((value,key) => {
        result.push({name: key, value: value})
    })

    return result


}


const MapPage = ({data}) => {

  const [locations, setLocations] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  console.log(data)



  useEffect(() => {

    if (!data || data.length === 0) return;

    async function fetchCoordinates() {
      setIsLoading(true)
      try{
      const results = await Promise.all(
        data.map((d) => ({name: d[2]}) ).map(async (city) => {
          const response = await fetch(
            `/geocode/search?format=json&q=${city.name}`
          );
          const data = await response.json();
          if (data && data[0]) {
            return {
              ...city,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
            };
          }
          return city;
        })
      );
      setLocations(results);
    } catch(error){
        console.log("Error fetching coordinates",error)
    } finally {

      setIsLoading(false)
    }
    }
    
    fetchCoordinates();
  }, [data]);

    if(isLoading){
    return <div>Loading....</div>
  }
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>City Data Visualization</h2>

      <BarChart width={500} height={300} data={getfrequencies(locations)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

 
      <MapContainer center={[55.3781, 3.4460]} zoom={5} style={{ height: "400px", width: "80%", marginTop: "20px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map(
          (loc, index) =>
            loc.lat && loc.lon && (
              <Marker key={index} position={[loc.lat, loc.lon]}>
                <Popup>
                  {loc.name}: {loc.value}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}

export default MapPage;
