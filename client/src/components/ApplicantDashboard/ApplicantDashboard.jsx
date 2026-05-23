import { useState, useRef, useEffect } from "react";
import { FaPlus, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import api, { API_BASE_URL } from "../../api/apiClient";
import ApplicantTabs from "./ApplicantTabs";
import DocumentViewer from "./DocumentViewer";
import { AddApplicantModal, AddDocumentModal } from "./Modals";
import "./ApplicantDashboard.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [activeApplicantId, setActiveApplicantId] = useState(null);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        fetchApplicants(user.email);
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [navigate]);

  const normalizeFile = (file) => {
    const rawFilePath = file.file_path || file.filePath || "";
    const normalizedPath = rawFilePath.replace(/\\/g, "/");
    const uploadsIndex = normalizedPath.indexOf("/uploads/");

    const filePath = uploadsIndex >= 0
      ? normalizedPath.slice(uploadsIndex + 1)
      : normalizedPath.startsWith("uploads/")
      ? normalizedPath
      : `uploads/${normalizedPath.split("/").pop()}`;

    return {
      id: file.id,
      name: file.file_name || file.name,
      filePath,
      file_size: file.file_size || file.size || "Saved",
      verificationStatus: file.verification_status || file.verificationStatus || "Pending",
    };
  };

  const fetchApplicants = async (email) => {
    try {
      const response = await api.get(`/get-applicants/${email}`);
      const applicantRows = Array.isArray(response.data)
        ? response.data
        : response.data.applicants || [];

      const applicantsWithDocuments = await Promise.all(
        applicantRows.map(async (applicant) => {
          const documentResponse = await api.get(`/get-documents/${applicant.id}`);
          const formattedDocuments = await Promise.all(
            documentResponse.data.map(async (doc) => {
              const fileResponse = await api.get(`/get-files/${doc.id}`);
              const uploadedFiles = fileResponse.data.map(normalizeFile);
              return {
                id: doc.id,
                name: doc.document_name,
                selectedFile: [],
                uploadedFiles,
              };
            })
          );
          return { ...applicant, documents: formattedDocuments };
        })
      );

      setApplicants(applicantsWithDocuments);
      if (!activeApplicantId && applicantsWithDocuments.length > 0) {
        setActiveApplicantId(applicantsWithDocuments[0].id);
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Unable to load applicants");
    }
  };

  const activeApplicant = applicants.find((applicant) => applicant.id === activeApplicantId);
  const filteredApplicants = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("✅ Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("❌ Logout Failed");
    }
  };

  const handleSaveApplicant = async () => {
    try {
      if (applicantName.trim() === "") return;
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        toast.error("❌ You must be signed in to add an applicant");
        return;
      }
      const response = await api.post("/add-applicant", {
        name: applicantName,
        user_email: userEmail,
      });
      const savedApplicant = response.data.applicant;
      setApplicants((prev) => [
        { ...savedApplicant, documents: [] },
        ...prev,
      ]);
      setActiveApplicantId(savedApplicant.id);
      setApplicantName("");
      setShowModal(false);
      toast.success("✅ Applicant Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to Add Applicant");
    }
  };

  const handleDeleteApplicant = async (id) => {
    try {
      await api.delete(`/delete-applicant/${id}`);
      const updatedApplicants = applicants.filter((applicant) => applicant.id !== id);
      setApplicants(updatedApplicants);
      if (activeApplicantId === id) {
        setActiveApplicantId(updatedApplicants[0]?.id || null);
        setCurrentDocumentId(null);
      }
      toast.success("🗑 Applicant Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to Delete Applicant");
    }
  };

  const handleSaveDocument = async () => {
    try {
      if (documentName.trim() === "" || !activeApplicant) return;
      const response = await api.post("/add-document", {
        applicant_id: activeApplicantId,
        document_name: documentName,
      });
      const savedDocument = response.data.document;
      const formattedDocument = {
        id: savedDocument.id,
        name: savedDocument.document_name,
        selectedFile: [],
        uploadedFiles: [],
      };
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.id === activeApplicantId
            ? { ...applicant, documents: [...applicant.documents, formattedDocument] }
            : applicant
        )
      );
      setCurrentDocumentId(formattedDocument.id);
      setDocumentName("");
      setShowDocumentModal(false);
      toast.success("✅ Document Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to Add Document");
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await api.delete(`/delete-document/${docId}`);
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.id === activeApplicantId
            ? {
                ...applicant,
                documents: applicant.documents.filter((doc) => doc.id !== docId),
              }
            : applicant
        )
      );
      if (currentDocumentId === docId) {
        setCurrentDocumentId(null);
      }
      toast.success("🗑 Document Name Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to Delete Document");
    }
  };

  const handleChooseFile = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0 || !activeApplicant || !currentDocumentId) return;

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    const validFiles = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not allowed. Only PDF/JPG/PNG accepted.`);
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB limit.`);
        continue;
      }
      validFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        status: "Pending",
        fileObject: file,
      });
    }

    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === activeApplicantId
          ? {
              ...applicant,
              documents: applicant.documents.map((doc) =>
                doc.id === currentDocumentId
                  ? { ...doc, selectedFile: [...doc.selectedFile, ...validFiles] }
                  : doc
              ),
            }
          : applicant
      )
    );
  };

  const handleUploadFile = async (documentId) => {
    try {
      const currentDocument = activeApplicant.documents.find((doc) => doc.id === documentId);
      if (!currentDocument || currentDocument.selectedFile.length === 0) {
        toast.error("No files selected");
        return;
      }

      const uploadedFiles = await Promise.all(
        currentDocument.selectedFile.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file.fileObject);
          formData.append("document_id", documentId);
          const response = await api.post("/upload-file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return {
            id: response.data.file.id,
            name: response.data.file.file_name,
            size: file.size,
            status: "Completed",
            verificationStatus: response.data.file.verification_status,
            filePath: response.data.file.file_path,
            file_size: file.size,
          };
        })
      );

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.id === activeApplicantId
            ? {
                ...applicant,
                documents: applicant.documents.map((doc) =>
                  doc.id === documentId
                    ? {
                        ...doc,
                        uploadedFiles: [...doc.uploadedFiles, ...uploadedFiles],
                        selectedFile: [],
                      }
                    : doc
                ),
              }
            : applicant
        )
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("✅ Files Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ File Upload Failed");
    }
  };

  const handleCancelSelectedFile = () => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === activeApplicantId
          ? {
              ...applicant,
              documents: applicant.documents.map((doc) =>
                doc.id === currentDocumentId ? { ...doc, selectedFile: [] } : doc
              ),
            }
          : applicant
      )
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.error("Selected files cancelled!");
  };

  const handleDeleteFile = async (documentId, fileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/delete-file/${fileId}`);
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.id === activeApplicantId
            ? {
                ...applicant,
                documents: applicant.documents.map((doc) =>
                  doc.id === documentId
                    ? {
                        ...doc,
                        uploadedFiles: doc.uploadedFiles.filter((file) => file.id !== fileId),
                      }
                    : doc
                ),
              }
            : applicant
        )
      );
      toast.success("🗑 File Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to Delete File");
    }
  };

  const handleViewFile = (file) => {
    if (!file.filePath) return;
    window.open(`${API_BASE_URL}/${file.filePath}`, "_blank");
  };

  const handleDownloadFile = async (file) => {
    if (!file.filePath) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${file.filePath}`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("✅ File Downloaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("❌ Download Failed");
    }
  };

  return (
    <div className="document-page">
      <div className="upload-card">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="page-title">Document Upload</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
          <button className="btn btn-primary add-btn" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" /> Add Applicant
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "15px" }}>
          <div style={{ position: "relative", width: "380px" }}>
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "14px",
                transform: "translateY(-50%)",
                color: "#7a7a7a",
                fontSize: "14px",
              }}
            />
            <input
              type="text"
              placeholder="Search Applicant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #d6d6d6",
                paddingLeft: "42px",
                fontSize: "15px",
                outline: "none",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            />
          </div>
        </div>

        <hr className="divider" />

        {filteredApplicants.length > 0 && (
          <>
            <ApplicantTabs
              applicants={filteredApplicants}
              activeApplicantId={activeApplicantId}
              onSelectApplicant={(id) => {
                setActiveApplicantId(id);
                setCurrentDocumentId(null);
              }}
              onDeleteApplicant={handleDeleteApplicant}
            />
            <div className="active-line"></div>

            {activeApplicant && activeApplicant.documents.length === 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px",
                    background: "#f8fafc",
                    borderRadius: "18px",
                    border: "2px dashed #cbd5e1",
                    marginTop: "25px",
                  }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>📂</div>
                  <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>No Documents Available</h3>
                  <p style={{ color: "#64748b", textAlign: "center", maxWidth: "400px" }}>
                    Upload and manage your documents securely using LoanWiser Document Portal.
                  </p>
                </div>
                <button className="btn add-document-btn" onClick={() => setShowDocumentModal(true)}>
                  <FaPlus className="me-2" /> Add
                </button>
              </>
            ) : activeApplicant ? (
              <DocumentViewer
                applicant={activeApplicant}
                currentDocumentId={currentDocumentId}
                fileInputRef={fileInputRef}
                onSelectDocument={setCurrentDocumentId}
                onShowAddDocument={() => setShowDocumentModal(true)}
                onDeleteDocument={handleDeleteDocument}
                onChooseFile={handleChooseFile}
                onUploadFile={handleUploadFile}
                onCancelSelectedFile={handleCancelSelectedFile}
                onDeleteFile={handleDeleteFile}
                onViewFile={handleViewFile}
                onDownloadFile={handleDownloadFile}
              />
            ) : null}
          </>
        )}
      </div>

      <AddApplicantModal
        show={showModal}
        value={applicantName}
        onChange={(e) => setApplicantName(e.target.value)}
        onSave={handleSaveApplicant}
        onClose={() => setShowModal(false)}
      />
      <AddDocumentModal
        show={showDocumentModal}
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        onSave={handleSaveDocument}
        onClose={() => setShowDocumentModal(false)}
      />
    </div>
  );
};

export default ApplicantDashboard;
