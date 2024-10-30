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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = ({ closeModal }) => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("general");
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

  const generateUniqueSlug = (title) => {
    const baseSlug = slugify(title);
    const uniqueIdentifier = Date.now();
    return `${baseSlug}-${uniqueIdentifier}`;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title && !value && !media) {
      alert("Please add at least a title, description, or image.");
      return;
    }
    
    if (title.length > 300) {
      alert("Title cannot exceed 300 characters.");
      return;
    }
    if (value.length > 40000) {
      alert("Description cannot exceed 40,000 characters.");
      return;
    }

    setPublishing(true);

    const uniqueSlug = generateUniqueSlug(title);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: uniqueSlug,
        catSlug: catSlug || "general",
      }),
    });

    setPublishing(false);

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
      closeModal(); // Close the modal after successful publish
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
<option value="general">General</option>
<option value="business-finance">Business & Finance</option>
<option value="artificial-intelligence">Artificial Intelligence</option>
<option value="gaming">Gaming</option>
<option value="entertainment">Entertainment</option>
<option value="metaverse">Metaverse</option>
<option value="blockchain">Blockchain</option>
<option value="virtual-reality">Virtual Reality</option>
<option value="augmented-reality">Augmented Reality</option>
<option value="threed-printing">3D Printing</option>
<option value="fintech">FinTech</option>
<option value="wearable-tech">Wearable Tech</option>
<option value="media">Media</option>
<option value="e-commerce">E-Commerce</option>
<option value="machine-learning">Machine Learning</option>
<option value="data-science">Data Science</option>
<option value="software">Software</option>
<option value="robotics">Robotics</option>
<option value="cloud-computing">Cloud Computing</option>
<option value="quantum-computing">Quantum Computing</option>
<option value="cybersecurity">Cybersecurity</option>
<option value="internet-of-things">Internet of Things</option>
<option value="networking">Networking</option>
<option value="fashion">Fashion</option>
<option value="foodtech">FoodTech</option>
<option value="electrical">Electrical</option>
<option value="electronics">Electronics</option>
<option value="automotive">Automotive</option>
<option value="aerospace">Aerospace</option>
<option value="energy">Energy</option>
<option value="physics">Physics</option>
<option value="mathematics">Mathematics</option>
<option value="biotech">Biotech</option>
<option value="geospatial">Geospatial</option>
<option value="mechanics">Mechanics</option>
<option value="industrial">Industrial</option>
<option value="construction">Construction</option>
<option value="medtech">MedTech</option>
<option value="agritech">AgriTech</option>
<option value="envirotech">EnviroTech</option>
<option value="marine-tech">Marine Technology</option>
<option value="military-tech">Military Technology</option>
<option value="supply-chain">Supply Chain</option>
<option value="smart-city">Smart City</option>
<option value="textile-tech">Textile Technology</option>
<option value="sports-tech">Sports Technology</option>
<option value="digital-art-design">Digital Art & Design</option>


          </select>
          <ReactQuill
            className={styles.editor}
            theme="bubble"
            value={value}
            onChange={handleContentChange}
            placeholder="What's trending..."
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
            <button className={styles.button} type="submit" disabled={uploading || publishing}>
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
