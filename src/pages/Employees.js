import "../App.css";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import Employee from "../components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";

function Employees() {
  const [role, setRole] = useState("dev");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Caleb",
      role: "Developer",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 2,
      name: "Pam",
      role: "Receptionist",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 3,
      name: "Dwight",
      role: "Assistant Manager",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 4,
      name: "Michael",
      role: "Manager",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 5,
      name: "Angela",
      role: "Customer Support",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 6,
      name: "Ryan",
      role: "Business Associate",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="">
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center">
            {employees.map((employees) => {
              const editEmployee = (
                <EditEmployee
                  id={employees.id}
                  name={employees.name}
                  role={employees.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employees.id}
                  id={employees.id}
                  name={employees.name}
                  role={employees.role}
                  img={employees.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}
export default Employees;
