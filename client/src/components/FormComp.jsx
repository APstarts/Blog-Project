import React from 'react';
import { useLocation } from 'react-router-dom';

function FormComp({ formData, buttonText }) {
  const location = useLocation();
  const isRegister = location.pathname === '/register'; // adjust as needed

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: isRegister ? e.target.name.value : null,
      surname: isRegister ? e.target.surname.value : null,
    };
    formData(data); // delegate to parent
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 md:w-2xl border-1 border-gray-300 p-5 shadow-2xl rounded-md dark:bg-gray-900"
      >
        <label>Email ID:</label>
        <input
          className="p-1 border-1 border-gray-300 rounded-md outline-blue-800"
          type="text"
          name="email"
        />

        {isRegister && (
          <>
            <label>Name</label>
            <input
              className="p-1 border-1 border-gray-300 rounded-md outline-blue-800"
              type="text"
              name="name"
              required
            />
            <label>Surname</label>
            <input
              className="p-1 border-1 border-gray-300 rounded-md outline-blue-800"
              type="text"
              name="surname"
              required
            />
          </>
        )}

        <label>Password:</label>
        <input
          className="p-1 border-1 border-gray-300 rounded-md outline-blue-800"
          type="password"
          name="password"
        />

        <button
          className="bg-blue-800 w-max text-white p-2 rounded-md hover:bg-blue-700 cursor-pointer"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default FormComp;
