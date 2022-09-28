import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const baseUrl = 'https://studentapi2.herokuapp.com/api';
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [State, setData] = useState();
  const form = useRef();
  const [refresh, setRefresh] = useState(1);
  const handleChange = (evt) => {
    const value = evt.target.value;
    setData({
      ...State,
      [evt.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/student`,
        data: State,
      });
      if(!res.data.error){
        setOpen(false)
        form.current.reset();
      }
      setRefresh(2);
    } catch (err) {
      console.log(err);
    }
  };
  const removeStudent = async (id) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${baseUrl}/student/${id}`,
      });
      if(!res.data.error){
        setRefresh(3);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllStudent = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${baseUrl}/students`,
      });
      setdata(res.data.student);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllStudent();
  }, [refresh]);

  return (
    <>
      <div className={`model ${open ? "active" : ""}`}>
        <div className="modelHeader">
          <h2 style={{ textAlign: "center" }}>Add New Student</h2>
          <button onClick={() => setOpen(!open)}>X</button>
        </div>
        <form ref={form} onSubmit={handleSubmit}>
          <label for="fname">Student Name</label>
          <input
            type="text"
            name="student_name"
            onChange={(e) => handleChange(e)}
          />

          <label for="subject">Subject</label>
          <input type="text" name="subject" onChange={(e) => handleChange(e)} />

          <label for="roll">Roll</label>
          <input
            type="text"
            name="student_roll"
            onChange={(e) => handleChange(e)}
          />

          <label for="birth">Date of birth</label>
          <input
            type="date"
            name="date_Of_birth"
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div className="Home">
        <h2>Student Details</h2>
        <button
          onClick={() => setOpen(!open)}
          className="btn"
          style={{
            marginBottom: "10px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Add User
        </button>
        <table>
          <tr>
            <th>S/N</th>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Roll</th>
            <th>Date of birth</th>
            <th>Action</th>
          </tr>
          { data.length>0 ?data.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.student_name}</td>
              <td>{item.subject}</td>
              <td>{item.student_roll}</td>
              <td>{item.date_Of_birth}</td>
              <td style={{}}>
                <button
                  onClick={() => removeStudent(item._id)}
                  className="btn"
                  style={{ backgroundColor: "red", marginLeft: "20px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )):
          <p style={{textAlign:'center'}}>loading......</p>
          }
        </table>
      </div>
    </>
  );
};

export default Home;
