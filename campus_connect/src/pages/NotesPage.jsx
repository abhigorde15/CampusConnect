import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [noteForm, setNoteForm] = useState({ title: '', branch: '', semester: '' });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch(() => toast.error("Failed to load notes"));
  }, []);

  const filteredNotes = notes.filter(note =>
    (branch === '' || note.branch === branch) &&
    (semester === '' || note.semester === semester) &&
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadNotes = () => {
    if (!token) {
      navigate('/auth');
      return;
    }
    setShowModal(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", noteForm.title);
    formData.append("branch", noteForm.branch);
    formData.append("semester", noteForm.semester);

    try {
      const res = await fetch("http://localhost:8080/api/notes/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
      toast.success("Note uploaded successfully!");
      setShowModal(false);
      setFile(null);
    } catch (error) {
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="font-sans px-4 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white min-h-screen relative">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-5xl font-bold text-center mb-2 text-gray-900">All Engineering Notes</h1>
      <p className="text-center text-gray-600 mb-6">Find, view, and share subject-wise notes semester-wise.</p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select value={branch} onChange={e => setBranch(e.target.value)} className="border px-4 py-2 rounded shadow-sm">
          <option value="">All Branches</option>
          <option>Information Technology</option>
          <option>Computer Engineering</option>
          <option>ENTC</option>
          <option>Mechanical</option>
        </select>

        <select value={semester} onChange={e => setSemester(e.target.value)} className="border px-4 py-2 rounded shadow-sm">
          <option value="">All Semesters</option>
          {[1,2,3,4,5,6,7,8].map(num => (
            <option key={num}>Semester {num}</option>
          ))}
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by subject..."
          className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm"
        />

        <button
          onClick={handleUploadNotes}
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
            <p className="text-sm text-gray-600">Uploaded by {note.uploadedBy?.name || 'Unknown'}</p>
            <p className="text-sm text-gray-500 mb-4">Uploaded: {new Date(note.uploadedAt).toLocaleDateString()}</p>
            <div className="flex space-x-2">
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Download
              </a>
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm"
              >
                Preview
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Upload New Notes</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={noteForm.title}
                onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <select
                value={noteForm.branch}
                onChange={(e) => setNoteForm({ ...noteForm, branch: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select Branch</option>
                <option>Information Technology</option>
                <option>Computer Engineering</option>
                <option>ENTC</option>
                <option>Mechanical</option>
              </select>
              <select
                value={noteForm.semester}
                onChange={(e) => setNoteForm({ ...noteForm, semester: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num}>Semester {num}</option>
                ))}
              </select>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
