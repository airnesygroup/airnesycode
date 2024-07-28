"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePageModal = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const upload = () => {
        setUploading(true);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Error uploading file:", error);
            setUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
              setUploading(false);
            });
          }
        );
      };
      upload();
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your logic for publishing the post
    // After publishing the post, navigate to the new post
    router.push("/path-to-new-post");
  };

  if (status !== "authenticated") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={() => router.back()}>
          &times;
        </button>
        <form className={styles.container} onSubmit={handleSubmit}>
          <select
            className={styles.select}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <div className={styles.characterCount}>{title.length}/100</div>
          <ReactQuill
            value={value}
            onChange={setValue}
            className={styles.editor}
            theme="bubble"
            placeholder="Write your story..."
          />
          <div className={styles.previewContainer}>
            {preview && (
              <>
                <Image src={preview} alt="Preview" className={styles.previewImage} />
                <button className={styles.deleteButton} onClick={() => setFile(null)}>
                  <img src="/delete-icon.png" alt="Delete" />
                </button>
              </>
            )}
          </div>
          <label className={styles.fileLabel}>
            Upload Image
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </label>
          <button type="submit" className={styles.publishButton} disabled={uploading}>
            {uploading ? "Uploading..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WritePageModal;
