import React, { useState, useEffect } from 'react';
import { updateEmployee } from '../../api/employees'; // Import the updateEmployee API function

const UpdateEmployeeForm = ({ employeeId }) => {
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {
        // Fetch the current employee data by employeeId
        const fetchEmployee = async () => {
            const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
            setEmployeeName(response.data.employeeName);
            setEmail(response.data.email);
            setPosition(response.data.position);
        };

        if (employeeId) {
            fetchEmployee();
        }
    }, [employeeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = { employeeName, email, position };
        const response = await updateEmployee(employeeId, employeeData);
        alert(response.message || 'Employee updated successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Employee Name:
                <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Position:
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default UpdateEmployeeForm;
