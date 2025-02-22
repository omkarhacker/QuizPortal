import { openDB } from 'idb';

// Open IndexedDB or create it if it doesn't exist
export const openQuizDB = async () => {
  return openDB('QuizPlatformDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('quizHistory')) {
        const store = db.createObjectStore('quizHistory', { keyPath: 'quizId' });
        store.createIndex('quizId', 'quizId', { unique: true });
      }
    },
  });
};

export const storeQuizHistory = async (quizHistoryData) => {
    try {
      const db = await openQuizDB();
      const tx = db.transaction('quizHistory', 'readwrite');
      const store = tx.objectStore('quizHistory');
  
      const existingHistory = await store.get(quizHistoryData.quizId);
  
      if (existingHistory) {
        quizHistoryData.attempts = (existingHistory.attempts || 0) + 1;
        console.log(`Updating Quiz ${quizHistoryData.quizId} with attempts: ${quizHistoryData.attempts}`); // Debugging line
      } else {
        quizHistoryData.attempts = 1;
        console.log(`Adding new Quiz ${quizHistoryData.quizId} with attempts: 1`); // Debugging line
      }
  
      await store.put(quizHistoryData);
      await tx.done;
      console.log('Quiz history successfully stored/updated.');
    } catch (error) {
      console.error('Error storing quiz history:', error);
    }
  };
// Get all quiz history
export const getAllQuizHistory = async () => {
  try {
    const db = await openQuizDB();
    const tx = db.transaction('quizHistory', 'readonly');
    const store = tx.objectStore('quizHistory');
    const history = await store.getAll();  // Get all stored quiz history
  
    console.log('Fetched quiz history:', history);
    return history;
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return [];
  }
};

// Get specific quiz history by quizId
export const getQuizHistoryById = async (quizId) => {
  try {
    const db = await openQuizDB();
    const tx = db.transaction('quizHistory', 'readonly');
    const store = tx.objectStore('quizHistory');
    const quizHistory = await store.get(quizId);
  
    if (quizHistory) {
      console.log(`Quiz history for Quiz ID ${quizId}:`, quizHistory);
    } else {
      console.log(`No quiz history found for Quiz ID ${quizId}`);
    }
  
    return quizHistory || null;
  } catch (error) {
    console.error('Error fetching quiz history by ID:', error);
    return null;
  }
};
