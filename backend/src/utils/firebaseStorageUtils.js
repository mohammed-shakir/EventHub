const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../firebaseConfig');

const uploadFileToStorage = (file, filePath) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file available');
    }

    const storageRef = ref(storage, filePath);
    uploadBytes(storageRef, file.buffer)
      .then(() => {
        resolve(filePath);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getFirebaseStorageUrl = (filePath) => {
  const storageRef = ref(storage, filePath);
  return getDownloadURL(storageRef);
};

module.exports = { uploadFileToStorage, getFirebaseStorageUrl };