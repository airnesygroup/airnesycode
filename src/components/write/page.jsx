"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = ({ closeModal }) => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState(""); // Set empty string as default to force selection
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const modalContentRef = useRef(null);

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


  const generateUniqueSlug = () => {
    const baseSlug = title ? slugify(title) : slugify(value);
    const uniqueIdentifier = Date.now();
    return baseSlug ? `${baseSlug}-${uniqueIdentifier}` : `${uniqueIdentifier}`;
  };
  

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setTitle(value);
    }
  };

  const handleContentChange = (content) => {
    setValue(content);
  };

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
  
    // Remove styles and images from the HTML
    const stylesAndImages = div.querySelectorAll('*[style], img');
    stylesAndImages.forEach((el) => el.remove());
  
    // Check for the number of lines of space and ensure no more than 2 empty lines
    const sanitizedContent = div.innerHTML.trim().replace(/\n{3,}/g, '\n\n');
  
    return sanitizedContent;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure either title or description is provided
    if (!title && !value) {
      alert("Please provide either a title or description.");
      return;
    }
  
    if (!catSlug) {
      alert("Please select a category.");
      return;
    }
  
    setPublishing(true);
    const uniqueSlug = generateUniqueSlug(title);
  
    // Sanitize the content before submitting
    const plainTextContent = stripHtml(value);
  
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: plainTextContent,  // Submit the sanitized content
        img: media,
        slug: uniqueSlug,
        catSlug,
      }),
    });
  
    setPublishing(false);
  
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
      closeModal();
    }
    
  
  

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
      closeModal();
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setPreview("");
    setMedia("");
  };

  const handleClickOutside = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <form className={styles.container} onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Title"
            className={styles.input}
            value={title}
            onChange={handleTitleChange}
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          />
          <div className={styles.characterCount}>
            {150 - title.length} characters remaining
          </div>
          <select
            className={styles.select}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option> 
            <option value="business">Business</option>
            <option value="idea">Ideas</option>
            <option value="technology">Technology</option>
            <option value="economics">Economics</option>
            <option value="science">Science</option>
            <option value="engineering">Engineering</option>
            <option value="mathematics">Mathematics</option>
          </select>
          <ReactQuill
  className={styles.editor}
  theme="bubble"
  value={value}
  onChange={handleContentChange}
  placeholder="What's trending..."
  modules={{
    toolbar: [
      [{ header: [1, 2, false] }],
      [ 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }}
  formats={[
    'italic',
    'underline',
    'link',
    'list', 
    'bullet'
  ]}
/>

          <div className={styles.characterCount}>
            {10000 - value.length} characters remaining
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className={styles.buttonsContainer}>
            <label htmlFor="file" className={`${styles.button} ${styles.fileLabel} ${uploading ? styles.uploading : ''}`}>
                <FontAwesomeIcon icon={faImage} /> {uploading ? "Uploading..." : "Upload Image"}
            </label>
            <button className={`${styles.button} ${styles.uploadButton}`} type="submit" disabled={uploading || publishing}>
            <FontAwesomeIcon icon={faUpload} />   {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
          {preview && (
            <div className={styles.previewContainer}>
              <Image src={preview} alt="Preview" className={styles.preview} width={200} height={200} />
              <button className={styles.deleteButton} onClick={handleDeleteImage}>
                &times;
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WritePage;
