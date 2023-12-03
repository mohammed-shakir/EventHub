const { storage } = require('../firebaseConfig');

const uploadFileToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file available');
    }

    const storageRef = storage.ref(`uploads/${file.originalname}`);
    const uploadTask = storageRef.put(file.buffer);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle progress
      }, 
      (error) => {
        reject(error);
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

module.exports = { uploadFileToStorage };