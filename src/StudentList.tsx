import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { deleteStudent, editStudent } from './redux/reducer';
import { Student } from './types/types';

const StudentList: React.FC = () => {
  const students = useSelector((state: RootState) => state.students.students);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    grade: '',
  });

  const handleEdit = (student: Student) => {
    setIsEditing(student.id);
    setEditedStudent(student);
  };

  const handleSave = () => {
    if (editedStudent) {
      dispatch(editStudent(editedStudent));
      setIsEditing(null);
      setEditedStudent(null);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(filters.name.toLowerCase());
    const ageMatch = filters.age ? student.age === parseInt(filters.age, 10) : true;
    const gradeMatch = student.grade.toLowerCase().includes(filters.grade.toLowerCase());
    return nameMatch && ageMatch && gradeMatch;
  });

  return (
    <div>
      <h2>Student List</h2>

      {/* Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        />
        <input
          type="number"
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
          placeholder="Filter by age"
        />
        <input
          type="text"
          name="grade"
          value={filters.grade}
          onChange={handleFilterChange}
          placeholder="Filter by grade"
        />
      </div>

      {/* Student List */}
      {filteredStudents.length === 0 ? (
        <p>No students match the criteria.</p>
      ) : (
        <ul>
          {filteredStudents.map((student) => (
            <li key={student.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
              {isEditing === student.id ? (
                <>
                  <input
                    type="text"
                    value={editedStudent?.name || ''}
                    onChange={(e) => setEditedStudent({ ...editedStudent!, name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    value={editedStudent?.age || ''}
                    onChange={(e) => setEditedStudent({ ...editedStudent!, age: parseInt(e.target.value, 10) })}
                    placeholder="Age"
                  />
                  <input
                    type="text"
                    value={editedStudent?.grade || ''}
                    onChange={(e) => setEditedStudent({ ...editedStudent!, grade: e.target.value })}
                    placeholder="Grade"
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {student.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {student.age}
                  </p>
                  <p>
                    <strong>Grade:</strong> {student.grade}
                  </p>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
