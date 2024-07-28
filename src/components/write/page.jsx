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
import Modal from "../Modal"; // Import the Modal component

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
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

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setTitle(value);
    }
  };

  const handleContentChange = (content) => {
    if (content.length <= 40000) {
      setValue(content);
    }
  };

  const generateUniqueSlug = async (baseSlug) => {
    let uniqueSlug = baseSlug;
    let counter = 1;
    const res = await fetch(`/api/posts/check-slug?slug=${uniqueSlug}`);
    let slugExists = await res.json();

    while (slugExists.exists) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
      const res = await fetch(`/api/posts/check-slug?slug=${uniqueSlug}`);
      slugExists = await res.json();
    }

    return uniqueSlug;
  };



  const handleSubmit = async () => {
    if (title.length > 300) {
      alert("Title cannot exceed 300 characters.");
      return;
    }
    if (value.length > 40000) {
      alert("Description cannot exceed 40,000 characters.");
      return;
    }
  
    const baseSlug = slugify(title);
    const uniqueSlug = await generateUniqueSlug(baseSlug);
  
    setUploading(true);
  
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: uniqueSlug,
        catSlug: catSlug || "style",
      }),
    });
  
    if (res.status === 200) {
      setUploading(false);
      const data = await res.json();
      alert("Uploaded successfully");
  
      // Close the modal immediately after publishing
      setOpen(false);
  
      // Delay navigation to allow modal to close properly
      setTimeout(() => {
        router.push(`/posts/${data.slug}`);
      }, 100); // Adjust the delay as needed
    } else {
      setUploading(false);
      alert("Failed to upload");
    }
  };
  

  const handleDeleteImage = () => {
    setFile(null);
    setPreview("");
    setMedia("");
  };

  return (
    <div className={styles.container}>
      <textarea
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={handleTitleChange}
      />
      <div className={styles.characterCount}>
        {300 - title.length} characters remaining
        {title.length > 300 && <span className={styles.error}>Title limit reached!</span>}
      </div>
      <select
        className={styles.select}
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="news">News</option>
        <option value="politics">Politics</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="health">Health</option>
        <option value="fitness">Fitness</option>
        <option value="science">Science</option>
        <option value="entertainment">Entertainment</option>
        <option value="style">Style</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="sports">Sports</option>
      </select>
      <ReactQuill
        className={styles.editor}
        theme="bubble"
        value={value}
        onChange={handleContentChange}
        placeholder="Share your thoughts..."
      />
      <div className={styles.characterCount}>
        {40000 - value.length} characters remaining
        {value.length > 40000 && <span className={styles.error}>Content limit reached!</span>}
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="file" className={styles.fileLabel}>
        {uploading ? "Uploading..." : "Upload Image"}
      </label>
      {preview && (
        <div className={styles.previewContainer}>
          <Image src={preview} alt="Preview" className={styles.preview} width={200} height={200} />
          <button className={styles.deleteButton} onClick={handleDeleteImage}>
            &times;
          </button>
        </div>
      )}
      <div className={styles.buttons}>
        <button className={styles.publishButton} onClick={handleSubmit} disabled={uploading}>
          {uploading ? "Uploading..." : "Publish"}
        </button>
      </div>

      <button className={styles.addButton} onClick={() => setOpen(true)}>+</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <textarea
          type="text"
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.characterCount}>
          {300 - title.length} characters remaining
          {title.length > 300 && <span className={styles.error}>Title limit reached!</span>}
        </div>
        <select
          className={styles.select}
          value={catSlug}
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value="news">News</option>
          <option value="politics">Politics</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="fitness">Fitness</option>
          <option value="science">Science</option>
          <option value="entertainment">Entertainment</option>
          <option value="style">Style</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="sports">Sports</option>
        </select>
        <ReactQuill
          className={styles.editor}
          theme="bubble"
          value={value}
          onChange={handleContentChange}
          placeholder="Share your thoughts..."
        />
        <div className={styles.characterCount}>
          {40000 - value.length} characters remaining
          {value.length > 40000 && <span className={styles.error}>Content limit reached!</span>}
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          id="fileModal"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="fileModal" className={styles.fileLabel}>
          {uploading ? "Uploading..." : "Upload Image"}
        </label>
        {preview && (
          <div className={styles.previewContainer}>
            <Image src={preview} alt="Preview" className={styles.preview} width={200} height={200} />
            <button className={styles.deleteButton} onClick={handleDeleteImage}>
              &times;
            </button>
          </div>
        )}
        <div className={styles.buttons}>
          <button className={styles.publishButton} onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Publish"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WritePage;
