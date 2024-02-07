import React, { useState } from 'react';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [password, setPassword] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('password', password);
            formData.append('expiryDate', expiryDate);

            fetch('http://localhost:3002/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('File uploaded successfully:', data);
                // Add any additional logic here, such as updating UI
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                // Handle error, display message to user, etc.
            });
        } else {
            console.error('No file selected');
            // Display message to user indicating that no file is selected
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-3">
                    <div className="form-group mt-3">
                        <label htmlFor="fileInput">Choose File</label>
                        <input type="file" className="form-control-file" id="fileInput" onChange={handleFileChange} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="passwordInput">Password (Optional)</label>
                        <input type="password" className="form-control" id="passwordInput" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="expiryDateInput">Expiry Date and Time (Optional)</label>
                        <input type="datetime-local" className="form-control" id="expiryDateInput" value={expiryDate} onChange={handleExpiryDateChange} />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
