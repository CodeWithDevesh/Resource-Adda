import React from 'react'
import { BrowserRouter, Routes, Route, useParams  } from 'react-router-dom'
import Navbar from './pages/Navbar'

export default function Resources() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState({});
  const {branch, sem} = useParams();
  // Fetch files from the backend
  useEffect(() => {
    axios.get(`/files?branch=${branch}&sem=${sem}`)
      .then(response => {
        setFiles(response.data.files);
        groupFilesBySubject(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, [branch, sem]);

  // Function to group files by subject
  const groupFilesBySubject = (files) => {
    const groupedFiles = files.reduce((acc, file) => {
      acc[file.subject] = acc[file.subject] || [];
      acc[file.subject].push(file);
      return acc;
    }, {});

    setFolders(groupedFiles);
  };

  return (
    <div className="file-explorer">
      {Object.keys(folders).map((subject) => (
        <Folder key={subject} subject={subject} files={folders[subject]} />
      ))}
    </div>
  );
};

// Folder component to handle collapsible folders
const Folder = ({ subject, files }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="folder">
      <div className="folder-header" onClick={toggleFolder}>
        <span>{isOpen ? '📂' : '📁'} {subject}</span>
      </div>
      {isOpen && (
        <div className="file-list">
          {files.map((file) => (
            <File key={file.fileName} file={file} />
          ))}
        </div>
      )}
    </div>
  );

}
