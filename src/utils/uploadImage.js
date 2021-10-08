import { storage } from "../firebase";

export async function uploadImage(image, currentUser) {
  const filepAth = `profileImages/${currentUser.uid}/${image.name}`;
  const fileref = storage.ref(filepAth);
  const uploadTask = await fileref.put(image);
  const url = await uploadTask.ref.getDownloadURL();
  return url;
}
