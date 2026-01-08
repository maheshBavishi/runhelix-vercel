"use client";
import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import styles from "./videoGenerated.module.scss";
import classNames from "classnames";
// const Video = "/assets/video/video.mp4";
const Video = "/assets/video/videonew.mp4";
const ArrowLg = '/assets/icons/arrow-lg.svg';
const AnimationVide = "/assets/images/logo-animation.webm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;
export default function VideoGenerated() {
  const [activeTab, setActiveTab] = useState('video');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
  const [generatedMediaType, setGeneratedMediaType] = useState('video'); // 'video' or 'image'
  const [generationStatus, setGenerationStatus] = useState('idle'); // idle, generating, completed, failed
  const [currentMessage, setCurrentMessage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const subscriptionRef = useRef(null);
  const [videoKey, setVideoKey] = useState(0);

  // Force video reload on visibility change (fixes mobile tab switch issue)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Tab became visible, reloading video...");
        setVideoKey(prev => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Load persisted state on mount
  useEffect(() => {
    const persistedUrl = localStorage.getItem("helix_generated_url");
    const persistedType = localStorage.getItem("helix_generated_type");
    if (persistedUrl) {
      setGeneratedVideoUrl(persistedUrl);
      setGeneratedMediaType(persistedType || 'video');
      setGenerationStatus('completed');
    }
  }, []);

  // Persist state when it changes
  useEffect(() => {
    if (generatedVideoUrl) {
      localStorage.setItem("helix_generated_url", generatedVideoUrl);
      localStorage.setItem("helix_generated_type", generatedMediaType);
    }
  }, [generatedVideoUrl, generatedMediaType]);

  const loadingMessages = [
    "Sequencing your product's visual DNA...",
    "Whispering sweet nothings to your brand.",
    "Assembling molecular storytelling strands.",
    "Writing your product's Oscar speech.",
    "Making your competitors nervous.",
    "Synthesizing art from atoms.",
    "Injecting imagination into the code.",
    "Splicing genius into your visuals.",
    "Wooing your pixels until they flirt back.",
    "Generating the next 'you'll never guess it's AI' moment.",
    "Delivering something you're about to brag about.",
    "The genome of storytelling is almost complete.",
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Cleanup subscription on unmount
  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setErrorMessage(""); // Clear error on interaction
      // Reset file input value to allow re-selecting same file if needed in future
      // e.target.value = null; 
    }
  };

  const getSessionId = () => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      session_id = crypto.randomUUID();
      localStorage.setItem("session_id", session_id);
    }
    return session_id;
  };

  const handleRunHelix = async (e) => {
    setErrorMessage("");
    if (!selectedFile && !description.trim()) {
      setErrorMessage("Please upload an image and enter a description.");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Please upload an image.");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please enter a description.");
      return;
    }

    e.preventDefault();
    setIsGenerating(true);
    setGenerationStatus('generating');
    setGeneratedVideoUrl(null);
    // Clear previous persistence
    localStorage.removeItem("helix_generated_url");
    localStorage.removeItem("helix_generated_type");

    const session_id = getSessionId();
    const API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API || "https://api.runhelix.ai";
    const userContent = description.trim();

    try {
      if (activeTab === 'image') {
        const endpoint = `${API_BASE_URL}/v1/media/image/generation`;
        const formData = new FormData();
        formData.append("user_content", userContent);
        formData.append("image_ratio", "portrait");
        formData.append("file", selectedFile);
        formData.append("session_id", session_id);

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          await handleGenerationResponse(data, session_id, userContent);
        } else {
          handleGenerationError();
        }
      } else {
        const endpoint = `${API_BASE_URL}/v1/video-generation/webhook`;

        const base64File = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        const base64Only = base64File.split(",")[1];

        const payload = {
          user_content: userContent,
          image_ratio: "portrait",
          image_base64: base64Only,
          session_id: session_id
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          await handleGenerationResponse(data, session_id, userContent);
        } else {
          handleGenerationError();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      handleGenerationError();
    }
  };

  const handleGenerationResponse = async (data, sessionId, userContent) => {
    console.log("Generation response data:", data);
    const mediaId = data.video_id || data.image_id;
    if (mediaId && supabase) {
      // Create/Upsert the record in Supabase to track it, similar to webapp logic
      const mode = activeTab === 'image' ? 'image-to-image' : 'image-to-video';
      const videoData = {
        id: mediaId,
        status: 'pending',
        created_at: new Date().toISOString(),
        title: userContent ? userContent.slice(0, 80) : "Generated Media",
        mode: mode,
        session_id: sessionId,
        user_content: userContent,
        // company_name: 'Helix Guest', // Optional/Default
        // url: 'https://runhelix.ai'   // Optional/Default
      };

      const { error } = await supabase.from("generated_videos").upsert([videoData], { onConflict: "id" });
      if (error) {
        console.error("Error upserting video record:", error);
        // alert(`Error upserting record: ${error.message}`);
      } else {
        console.log("Upserted video record successfully");
      }

      subscribeToMedia(mediaId);
    } else {
      console.warn("No media ID or Supabase client");
      if (!supabase) alert("Supabase client not initialized! Check env vars.");
      setIsGenerating(false);
      setGenerationStatus('failed');
    }
  };

  const handleGenerationError = () => {
    console.error("Generation failed");
    setGenerationStatus('failed');
    setIsGenerating(false);
    alert("Failed to start generation.");
  };

  const subscribeToMedia = (mediaId) => {
    const channel = supabase
      .channel(`generated_videos_${mediaId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "generated_videos",
          filter: `id=eq.${mediaId}`,
        },
        (payload) => {
          console.log("Supabase Realtime Payload:", payload);
          const newData = payload.new;
          if (newData && newData.status === "completed" && newData.location) {
            const mediaUrl = newData.location.startsWith("http")
              ? newData.location
              : `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://api.runhelix.ai'}/storage/v1/object/public/${newData.location}`;

            console.log("Constructed Media URL:", mediaUrl);
            console.log("Media Mode:", newData.mode);

            setGeneratedVideoUrl(mediaUrl);

            // Determine type from mode if available, otherwise default to activeTab's implication
            const isImage = newData.mode === 'image-to-image';
            setGeneratedMediaType(isImage ? 'image' : 'video');

            setGenerationStatus('completed');
            setIsGenerating(false);
            supabase.removeChannel(channel);
          } else if (newData && newData.status === "failed") {
            setGenerationStatus('failed');
            setIsGenerating(false);
            supabase.removeChannel(channel);
            alert("Generation failed.");
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for ${mediaId}:`, status);
        if (status === "SUBSCRIBED") {
          console.log("Channel connected!");
        } else if (status === "CHANNEL_ERROR") {
          console.error("Channel error!");
          setIsGenerating(false);
          setGenerationStatus('failed');
          setErrorMessage("Realtime connection error. Please try again.");
          supabase.removeChannel(channel);
        } else if (status === "TIMED_OUT") {
          console.error("Channel timed out!");
          setIsGenerating(false);
          setGenerationStatus('failed');
          setErrorMessage("Connection timed out. Please check your network and try again.");
          supabase.removeChannel(channel);
        }
      });

    subscriptionRef.current = channel;
  };

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // ... (existing Supabase subscriptions)

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    const session_id = getSessionId();
    window.location.href = `https://platform.runhelix.ai/auth?session_id=${session_id}`;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setErrorMessage("");
      } else {
        setErrorMessage("Please upload an image file.");
      }
    }
  };

  return (
    <div className={styles.videoGenerated}>
      <div className="container-xs">
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Create Your First Product Video or Image</h2>
          <div className={styles.alliconTextAlignment}>
            <div className={styles.iconText}>
              <span>Idea</span>
              <img src={ArrowLg} alt="ArrowLg" />
            </div>
            <div className={styles.iconText}>
              <span>Run Helix</span>
              <img src={ArrowLg} alt="ArrowLg" />
            </div>
            <div className={styles.iconText}>
              <span>Post</span>
              <img src={ArrowLg} alt="ArrowLg" />
            </div>
            <div className={styles.iconText}>
              <span>Test</span>
              <img src={ArrowLg} alt="ArrowLg" />
            </div>
            <div className={styles.iconText}>
              <span>Boost</span>
              <img src={ArrowLg} alt="ArrowLg" />
            </div>
            <div className={styles.iconText}>
              <span>Repeat</span>
            </div>
          </div>
        </motion.div>
        <div className={styles.boxborderstyle}>
          <div className={styles.videobox}>
            {isGenerating ? (
              <div style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                {/* CSS Spinner */}
                {/* <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTop: '4px solid #29A6B4', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div> */}
                {/* <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style> */}
                <video
                  src={AnimationVide}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="mt-6"
                />
                <p style={{ color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  {loadingMessages[currentMessage]}
                </p>
                <p style={{ color: '#ffffff70', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                  Helix is now running . Videos can take up to 7 minutes to generate, please enjoy a snack.
                </p>
              </div>
            ) : generatedVideoUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <button
                  onClick={handleDownloadClick}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s ease'
                  }}
                  title="Download & Save"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                {generatedMediaType === 'image' ? (
                  <img src={generatedVideoUrl} alt="Generated Image" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: "100%" }} />
                ) : (
                  <video
                    key={`${generatedVideoUrl}-${videoKey}`}
                    src={generatedVideoUrl}
                    alt="Generated Video"
                    playsInline
                    autoPlay
                    muted
                    controls
                    style={{ width: '100%', borderRadius: '12px', height: "100%" }}
                  ></video>
                )}
              </div>
            ) : (
              <video
                key={`default-helix-video-${videoKey}`}
                src={Video}
                alt="Video"
                autoPlay
                playsInline
                muted
                loop
              ></video>
            )}
            {!generatedVideoUrl && !isGenerating && <div className={styles.details}>
              <p>
                {/* Older man in the hot sun on a golfcourse with friends and a bottle
              of PeptiPROTECT */}
                Natural UGC-style video in an everyday setting with a realistic creator. Handheld phone camera feel, casual movements, authentic lighting

              </p>
            </div>}
          </div>
          <div className={styles.boxborder}>
            {generatedVideoUrl ? (
              null
            ) : (
              <div className={styles.twobutton}>
                <a >
                  <button className={classNames(styles.outline, activeTab === 'video' ? styles.activeButton : "")}
                    onClick={
                      () => { setActiveTab('video') }
                    }>Video</button>
                </a>
                <a >
                  <button className={classNames(styles.outline, activeTab === 'image' ? styles.activeButton : "")}
                    onClick={
                      () => { setActiveTab('image') }
                    }
                  >Image</button>
                </a>

              </div>
            )}
            {!generatedVideoUrl && <div
              className={styles.lightbox}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragging ? '2px dashed #29A6B4' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: isDragging ? 'rgba(41, 166, 180, 0.1)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <div className={styles.chatbottombar}>
                {preview && (
                  <div style={{ padding: '10px 16px 0 16px' }}>
                    <div style={{ position: 'relative', width: 'fit-content' }}>
                      <img src={preview} alt="Preview" style={{ height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div onClick={(e) => {
                        e.preventDefault();
                        setSelectedFile(null);
                        setPreview(null);
                      }} style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#cf1322',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '12px',
                        zIndex: 10
                      }}>×</div>
                    </div>
                  </div>
                )}
                <textarea
                  placeholder="Simply enter your prompt and media here to create your first video"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                ></textarea>
                <div className={styles.buttonAlignment}>
                  {/* <a href="https://platform.runhelix.ai/auth" target="_blank"> */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className={styles.btnupload}>
                      <input type="file" onChange={handleFileChange} accept="image/*" />
                      <button className={styles.fillbutton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M5.0552 16.4643C4.20215 16.4645 3.36818 16.2117 2.65884 15.7379C1.9495 15.264 1.39666 14.5904 1.07027 13.8022C0.743882 13.0141 0.658617 12.1468 0.825263 11.3102C0.99191 10.4736 1.40298 9.7052 2.00645 9.10227L8.37021 2.73777C8.47573 2.63224 8.61885 2.57296 8.76808 2.57296C8.91731 2.57296 9.06043 2.63224 9.16596 2.73777C9.27148 2.84329 9.33076 2.98641 9.33076 3.13564C9.33076 3.28487 9.27148 3.42799 9.16596 3.53352L2.80145 9.89727C2.49333 10.1905 2.24701 10.5424 2.077 10.9323C1.907 11.3222 1.81675 11.7422 1.81157 12.1675C1.80639 12.5928 1.88638 13.0149 2.04684 13.4088C2.2073 13.8027 2.44497 14.1605 2.74586 14.4612C3.04675 14.7618 3.40477 14.9992 3.79883 15.1593C4.19288 15.3194 4.61499 15.3991 5.0403 15.3935C5.46561 15.388 5.88552 15.2974 6.27527 15.1271C6.66502 14.9567 7.01674 14.7101 7.30971 14.4018L15.5297 6.18177C15.9064 5.79279 16.1151 5.27133 16.1107 4.72988C16.1064 4.18843 15.8893 3.67038 15.5065 3.2875C15.1236 2.90463 14.6055 2.68761 14.0641 2.68326C13.5226 2.67891 13.0012 2.88759 12.6122 3.26427L5.9837 9.89727C5.89664 9.98433 5.82757 10.0877 5.78045 10.2015C5.73333 10.3152 5.70908 10.4371 5.70908 10.5603C5.70908 10.6834 5.73333 10.8053 5.78045 10.9191C5.82757 11.0328 5.89664 11.1362 5.9837 11.2233C6.07077 11.3103 6.17413 11.3794 6.28789 11.4265C6.40165 11.4736 6.52357 11.4979 6.6467 11.4979C6.76984 11.4979 6.89176 11.4736 7.00552 11.4265C7.11928 11.3794 7.22264 11.3103 7.30971 11.2233L11.551 6.98127C11.6028 6.92752 11.6649 6.88464 11.7335 6.85513C11.8021 6.82561 11.8759 6.81006 11.9506 6.80938C12.0253 6.80869 12.0993 6.82289 12.1685 6.85114C12.2376 6.87939 12.3005 6.92113 12.3533 6.97392C12.4061 7.02671 12.4479 7.08949 12.4762 7.15861C12.5046 7.22772 12.5188 7.30179 12.5182 7.37648C12.5176 7.45116 12.5021 7.52498 12.4727 7.59362C12.4432 7.66226 12.4004 7.72435 12.3467 7.77627L8.10471 12.019C7.91319 12.2106 7.68582 12.3626 7.43557 12.4662C7.18532 12.5699 6.9171 12.6233 6.64622 12.6234C6.37534 12.6234 6.10711 12.5701 5.85683 12.4664C5.60656 12.3628 5.37915 12.2109 5.18758 12.0194C4.99601 11.8279 4.84405 11.6005 4.74035 11.3503C4.63666 11.1 4.58327 10.8318 4.58324 10.5609C4.58317 10.0138 4.80042 9.48915 5.1872 9.10227L11.8172 2.47677C12.4149 1.87894 13.2257 1.54304 14.0711 1.54297C14.9165 1.5429 15.7272 1.87866 16.3251 2.47639C16.9229 3.07412 17.2588 3.88486 17.2589 4.73025C17.2589 5.57564 16.9232 6.38644 16.3255 6.98427L8.10545 15.2013C7.70576 15.603 7.23038 15.9214 6.70681 16.1382C6.18324 16.355 5.62188 16.4658 5.0552 16.4643Z" fill="white" />
                        </svg>
                        Media
                      </button>
                    </div>
                  </div>
                  {/* </a> */}
                  <div className={styles.rightAlignment}>
                    {/* <a href="https://platform.runhelix.ai/auth" target="_blank">
                      <button>UGC</button>
                    </a> */}
                    {/* <a href="https://platform.runhelix.ai/auth" target="_blank">
                      <button>portrait</button>
                    </a> */}
                    <button
                      onClick={handleRunHelix}
                      style={{ cursor: isGenerating ? 'not-allowed' : 'pointer' }}
                      disabled={isGenerating}
                      className={classNames(isGenerating ? "" : styles.fillbutton)}
                    >
                      {isGenerating ? "Generating..." : "Run Helix"}
                      {!isGenerating && <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.82896 3.39688C5.20616 2.46603 3.8905 3.2286 3.8905 5.09877V18.8998C3.8905 20.7719 5.20616 21.5335 6.82896 20.6035L18.8918 13.6855C20.5151 12.7543 20.5151 11.2457 18.8918 10.3147L6.82896 3.39688Z"
                          fill="#29A6B4"
                        ></path>
                      </svg>}
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <p style={{ color: '#ff4d4f', fontSize: '13px', padding: '0 10px 10px 10px', textAlign: 'left', maxWidth: '300px' }}>
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>}
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowDownloadModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setShowDownloadModal(false)}
            >
              ×
            </button>
            <h3>We hope you love your {generatedMediaType === 'image' ? 'Image' : 'Video'}</h3>
            <p>To download, please create an account.</p>
            <button className={styles.modalButton} onClick={confirmDownload}>
              Create Account
            </button>
          </div>
        </div>
      )}
    </div >
  );
}
