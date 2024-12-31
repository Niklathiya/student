import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from './redux/reducer';
import { Student } from './types/types';

const AddStudentForm: React.FC = () => {
  const [student, setStudent] = useState<Student>({ id: '', name: '', age: 0, grade: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student.name && student.age && student.grade) {
      dispatch(addStudent({ ...student, id: Date.now().toString() }));
      setStudent({ id: '', name: '', age: 0, grade: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={student.name}
        onChange={e => setStudent({ ...student, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="number"
        value={student.age}
        onChange={e => setStudent({ ...student, age: +e.target.value })}
        placeholder="Age"
      />
      <input
        type="text"
        value={student.grade}
        onChange={e => setStudent({ ...student, grade: e.target.value })}
        placeholder="Grade"
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
