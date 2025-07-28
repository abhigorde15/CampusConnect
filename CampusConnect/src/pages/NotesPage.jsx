import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const NotesPage = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dummyNotes = [
    { id: 1, title: 'Data Structures – Unit 1 Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'Information Technology', semester: 'Semester 3' },
    { id: 2, title: 'DBMS – Unit 2 Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'Computer Engineering', semester: 'Semester 4' },
    { id: 3, title: 'OOP – Unit 3 Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'Information Technology', semester: 'Semester 3' },
    { id: 4, title: 'CN – Unit 4 Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'ENTC', semester: 'Semester 5' },
    { id: 5, title: 'OS – Unit 5 Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'Mechanical', semester: 'Semester 6' },
    { id: 6, title: 'DSA – Full Semester Notes', uploader: 'Abhishek Gorde', date: 'June 2025', branch: 'Information Technology', semester: 'Semester 3' }
  ];

const filteredNotes = dummyNotes.filter(note =>
  (branch === '' || note.branch === branch) &&
  (semester === '' || note.semester === semester) &&
  note.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="font-sans px-4 py-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">All Engineering Notes</h1>
      <p className="text-center text-gray-600 mb-6">Find, view, and share subject-wise notes semester-wise.</p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={branch}
          onChange={e => setBranch(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
          
        >
          <option value="">All Branches</option>
          <option>Information Technology</option>
          <option>Computer Engineering</option>
          <option>ENTC</option>
          <option>Mechanical</option>
        </select>

        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
        >
           <option value="">All Semesters</option>
          <option>Semester 1</option>
          <option>Semester 2</option>
          <option>Semester 3</option>
          <option>Semester 4</option>
          <option>Semester 5</option>
          <option>Semester 6</option>
          <option>Semester 7</option>
          <option>Semester 8</option>
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by subject..."
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm"
        />

        <button
          onClick={() => toast.success('Redirecting to upload page...')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-sm"
        >
          Upload Your Notes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">📄</span>
              <h3 className="font-semibold text-gray-800 text-lg">{note.title}</h3>
            </div>
            <p className="text-sm text-gray-600">Uploaded by {note.uploader}</p>
            <p className="text-sm text-gray-500 mb-4">Uploaded: {note.date}</p>
            <div className="flex space-x-2">
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                onClick={() => toast.success('Downloading...')}
              >
                Download
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm"
                onClick={() => toast('Opening preview...')}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
