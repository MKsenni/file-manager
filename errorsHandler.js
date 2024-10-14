export default async function errorHandler(startFileManager) {
  try {
    startFileManager();
  } catch(err) {
    console.error('Operation failed');
  }
}