import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getpost", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === 401 || !res.data.status) {
        alert("Image Not uploaded. Try again.");
      } else {
        setData(res.data.user);
        console.log(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      alert("An error occurred while fetching data. Please try again.");
    }
  };

  const deleteUserData = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("clicked");
      if (res.status === 401 || !res.status) {
        alert("Image Not deleted. Try again.");
      } else {
        console.log("User deleted: ", res);
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <React.Fragment>
      <div className="w-full ">
        <div className="w-full p-5 flex flex-col gap-4">
          <h1 className="w-full text-center text-[35px] font-semibold text-red-700">
            Upload Image Dashboard
          </h1>
          <Link to="/registration" className="w-[fit-content] m-auto">
            <button className="text-white bg-black px-5 py-4 rounded-xl">
              Add User
            </button>
          </Link>
        </div>
        <hr className="border-[5px] rounded-lg border-[#707070]" />
      </div>
      <div className="w-[80%] flex flex-wrap items-center mt-5 m-auto">
        {data.length === 0 ? (
          <>
            <h1 className="text-center w-full text-[45px]">Nothing to show</h1>
          </>
        ) : (
          data.map((val, ind) => {
            return (
              <div className="w-[23%] bg-slate-200 p-5 rounded-xl ml-5 mb-5" key={val._id}>
                <img
                  src={`/uploads/${val.imagePath}`}
                  alt=""
                  style={{ width: "100%", height: "200px", objectFit: "none" }}
                />
                <h1 className="text-center text-[20px] mt-5">Image</h1>
                <p>{val.username}</p>
                <p>{val.date.slice(0,10)}</p>
                <button className="bg-red-500 px-5 py-2 mt-5 w-full text-white rounded-[10px]" onClick={() => deleteUserData(val.imagePath)}>
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
