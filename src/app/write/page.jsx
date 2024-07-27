"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Image from "next/image";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["link", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "blockquote",
  "code-block",
  "color",
  "background",
  "align",
];

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
        <option value="music">Music</option>
        <option value="movies">Movies</option>
        <option value="gaming">Gaming</option>
        <option value="sports">Sports</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="fashion">Fashion</option>
        <option value="education">Education</option>
        <option value="environment">Environment</option>
        <option value="climate">Climate</option>
        <option value="art">Art</option>
        <option value="design">Design</option>
        <option value="books">Books</option>
        <option value="diy">DIY</option>
        <option value="crafts">Crafts</option>
        <option value="relationships">Relationships</option>
        <option value="ama">Ask Me Anything</option>
        <option value="humor">Humor</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="adventure">Adventure</option>
        <option value="opinion">Opinion</option>
      </select>
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <button className={styles.deleteButton} onClick={handleDeleteImage}>
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
        </div>
      )}
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={`${styles.textArea} quill`}
          theme="bubble"
          value={value}
          onChange={handleContentChange}
          placeholder="Tell your story..."
          modules={modules}
          formats={formats}
        />
      </div>
      <div className={styles.characterCount}>
        {40000 - value.length} characters remaining
        {value.length > 40000 && <span className={styles.error}>Description limit reached!</span>}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;





