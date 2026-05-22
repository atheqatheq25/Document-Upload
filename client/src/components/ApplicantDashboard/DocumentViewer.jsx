import { FaPlus, FaTrash, FaUpload, FaTimes, FaEye, FaDownload } from "react-icons/fa";
import "./DocumentViewer.css";

const formatFileSize = (size) => {
  if (!size || size === "Saved") return "Saved";
  return `${size} KB`;
};

const DocumentViewer = ({
  applicant,
  currentDocumentId,
  fileInputRef,
  onSelectDocument,
  onShowAddDocument,
  onDeleteDocument,
  onChooseFile,
  onUploadFile,
  onCancelSelectedFile,
  onViewFile,
  onDownloadFile,
  onDeleteFile,
}) => {
  if (!applicant) return null;

  const selectedDocument = applicant.documents.find(
    (doc) => doc.id === currentDocumentId
  );

  return (
    <div className="documents-container">
      <div className="document-sidebar">
        {applicant.documents.map((doc) => (
          <div key={doc.id} className="document-item-row">
            <div
              className={`document-box ${
                currentDocumentId === doc.id ? "active-document-box" : ""
              }`}
              onClick={() => onSelectDocument(doc.id)}
            >
              {doc.name}
            </div>
            <button
              className="document-delete-btn"
              onClick={() => onDeleteDocument(doc.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <button
          className="btn add-document-side-btn"
          onClick={onShowAddDocument}
        >
          <FaPlus className="me-2" /> Add
        </button>
      </div>

      <div className="documents-right-area">
        {selectedDocument ? (
          <div className="single-document-section">
            <div className="upload-section">
              <div className="upload-top-bar">
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={onChooseFile}
                />
                <button
                  className="btn choose-btn"
                  onClick={() => {
                    onSelectDocument(selectedDocument.id);
                    fileInputRef.current.click();
                  }}
                >
                  <FaPlus className="me-2" /> Choose
                </button>
                <button
                  className="btn upload-btn"
                  onClick={() => onUploadFile(selectedDocument.id)}
                >
                  <FaUpload className="me-2" /> Upload
                </button>
                <button
                  className="btn cancel-upload-btn"
                  onClick={() => onCancelSelectedFile(selectedDocument.id)}
                >
                  <FaTimes className="me-2" /> Cancel
                </button>
              </div>

              <div className="drag-drop-area">
                {selectedDocument.selectedFile.length > 0 &&
                  selectedDocument.selectedFile.map((file) => (
                    <div key={file.id} className="uploaded-file-row">
                      <div>
                        <div className="file-name">{file.name}</div>
                        <div className="file-details">
                          {formatFileSize(file.size)}
                          <span className="pending-badge">Pending</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {selectedDocument.uploadedFiles?.map((file) => (
                  <div key={file.id} className="uploaded-file-row">
                    <div>
                      <div className="file-name">{file.name}</div>
                      <div className="file-details">
                        {formatFileSize(file.file_size)}
                        <span className="completed-badge">Completed</span>
                      </div>
                    </div>
                    <div className="file-action-buttons">
                      <button className="view-btn" onClick={() => onViewFile(file)}>
                        <FaEye />
                      </button>
                      <button
                        className="download-btn"
                        onClick={() => onDownloadFile(file)}
                      >
                        <FaDownload />
                      </button>
                      <button
                        className="remove-file-btn"
                        onClick={() => onDeleteFile(selectedDocument.id, file.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedDocument.selectedFile.length === 0 &&
                  selectedDocument.uploadedFiles.length === 0 && (
                    <p>Drag and Drop files here.</p>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-doc-text">
            Select a document to view upload controls.
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
