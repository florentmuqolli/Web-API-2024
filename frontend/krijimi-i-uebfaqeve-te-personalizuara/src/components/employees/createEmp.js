import React, { useState } from 'react';
import { createEmployee } from '../../api/employees';

const CreateEmployeeForm = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = { employeeName, email, position };
        const response = await createEmployee(employeeData);
        alert(response.message || 'Employee created successfully');
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
            <button type="submit">Create Employee</button>
        </form>
    );
};

export default CreateEmployeeForm;
