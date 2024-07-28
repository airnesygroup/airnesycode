// components/WritePage.js
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
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
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

  const handleSubmit = async () => {
    if (title.length > 300) {
      alert("Title cannot exceed 300 characters.");
      return;
    }
    if (value.length > 40000) {
      alert("Description cannot exceed 40,000 characters.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
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
        Upload Image
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
        <button className={styles.button} onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default WritePage;

