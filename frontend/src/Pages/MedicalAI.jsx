import {
  Activity,
  ArrowBigRight,
  CircleAlert,
  ClipboardCheck,
  ClipboardList,
  Clock,
  MapPin,
  Pill,
  User,
  UtensilsCrossed,
  Dumbbell,
  Loader2,
  X,
  Mic,
  Search,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FLASK_API_URL = import.meta.env.VITE_FLASK_URL;
const API_URL = import.meta.env.VITE_BACKEND_URL;

const MedicalAI = () => {
  // Form states
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [diseaseDuration, setDiseaseDuration] = useState("");
  const [patientLocation, setPatientLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Symptoms states
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Result states
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Active tab for results
  const [activeTab, setActiveTab] = useState("description");

  // Speech recognition
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("");

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { patientId } = useParams();

  // Fetch symptoms from Flask API
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await axios.get(`${FLASK_API_URL}/api/symptoms`);
        if (res.data.symptoms) {
          setAllSymptoms(res.data.symptoms);
        }
      } catch (error) {
        setAllSymptoms([
          "itching",
          "skin_rash",
          "continuous_sneezing",
          "shivering",
          "chills",
          "joint_pain",
          "stomach_pain",
          "acidity",
          "vomiting",
          "fatigue",
          "weight_gain",
          "anxiety",
          "weight_loss",
          "cough",
          "high_fever",
          "breathlessness",
          "sweating",
          "headache",
          "nausea",
          "loss_of_appetite",
          "back_pain",
          "constipation",
          "abdominal_pain",
          "diarrhoea",
          "mild_fever",
          "chest_pain",
          "dizziness",
          "depression",
          "muscle_pain",
          "neck_pain",
          "throat_irritation",
          "runny_nose",
          "congestion",
          "indigestion",
          "dehydration",
          "phlegm",
          "knee_pain",
          "stiff_neck",
          "yellowish_skin",
          "dark_urine",
          "yellowing_of_eyes",
          "swelling_joints",
          "blurred_and_distorted_vision",
        ]);
      }
    };
    fetchSymptoms();
  }, []);

  const handleGenerateReport = async () => {
    if (!result) return;

    try {
      toast.info("Saving AI report...");
      // const patientId = "690f793c63dcb98c723ee140"

      if (!patientId) {
        toast.error("Patient not logged in");
        return;
      }

      const response = await axios.post(`${API_URL}/api/reports/add`, {
        patientId,
        diseases: result.predicted_disease,
        description: result.description,
        precautions: result.precautions?.join(", "),
        medicines: (result.medications || []).map((m) => ({
          medicine: m,
          amount: "N/A",
          time: "As prescribed",
          days: 1,
        })),
        diet: result.diet?.join(", "),
        workout: result.workout?.join(", "),
        notes: "AI generated report. Please consult a doctor.",
        nextVisit: null,
        isAIGenerated: true,
      });

      toast.success("Report saved successfully!");

      const reportId = response.data.report._id;

      // Navigate using ID
      navigate(`/report/${reportId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save report");
    }
  };
  // Format symptom for display
  const formatSymptom = (name) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Filter symptoms based on search
  const filterSymptoms = (query) => {
    if (query.length < 1) return [];
    query = query.toLowerCase().trim();

    return allSymptoms
      .filter((symptom) => {
        if (selectedSymptoms.includes(symptom)) return false;
        const formatted = symptom.replace(/_/g, " ");
        return symptom.includes(query) || formatted.includes(query);
      })
      .slice(0, 8);
  };

  // Handle search input
  const handleSearchInput = (value) => {
    setSearchInput(value);
    const results = filterSymptoms(value);
    setSuggestions(results);
    setShowSuggestions(true);
  };

  // Add symptom
  const addSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    }
    setSearchInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Remove symptom
  const removeSymptom = (name) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== name));
    toast.info(`Removed: ${formatSymptom(name)}`);
  };

  // Speech Recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechStatus("❌ Speech not supported. Use Chrome/Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechStatus("🎤 Listening... Speak your symptoms");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const confidence = (event.results[0][0].confidence * 100).toFixed(0);

      console.log("Heard:", transcript);

      // Split by comma, "and", or spaces
      const words = transcript
        .split(/[,\s]+|and/)
        .map((w) => w.trim())
        .filter((w) => w.length > 2);

      let addedSymptoms = [];

      words.forEach((word) => {
        // Find matching symptom
        const match = allSymptoms.find((s) => {
          const symptomClean = s.replace(/_/g, " ").toLowerCase();
          const symptomNoSpace = s.replace(/_/g, "").toLowerCase();
          return (
            s.toLowerCase() === word ||
            symptomClean === word ||
            symptomClean.includes(word) ||
            word.includes(symptomClean) ||
            symptomNoSpace.includes(word) ||
            word.includes(symptomNoSpace)
          );
        });

        if (
          match &&
          !selectedSymptoms.includes(match) &&
          !addedSymptoms.includes(match)
        ) {
          addedSymptoms.push(match);
        }
      });

      // Add all matched symptoms
      if (addedSymptoms.length > 0) {
        setSelectedSymptoms((prev) => [...prev, ...addedSymptoms]);
        setSpeechStatus(
          `✅ Added: ${addedSymptoms
            .map((s) => formatSymptom(s))
            .join(", ")} (${confidence}%)`,
        );
      } else {
        // Try direct match for the whole phrase
        const directMatch = allSymptoms.find((s) => {
          const symptomClean = s.replace(/_/g, " ").toLowerCase();
          return (
            transcript.includes(symptomClean) ||
            symptomClean.includes(transcript)
          );
        });

        if (directMatch && !selectedSymptoms.includes(directMatch)) {
          setSelectedSymptoms((prev) => [...prev, directMatch]);
          setSpeechStatus(
            `✅ Added: ${formatSymptom(directMatch)} (${confidence}%)`,
          );
        } else {
          setSpeechStatus(`🔍 Heard: "${transcript}" - Try typing to search`);
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      const errors = {
        "no-speech": "❌ No speech detected. Try again.",
        "audio-capture": "❌ No microphone found.",
        "not-allowed": "❌ Microphone access denied.",
      };
      toast.error(errors[event.error] || `Speech recognition error`);
    };

    recognition.start();
  };

  // Submit prediction
  const handlePredict = async () => {
    if (!patientName || patientName.trim().length < 2) {
      toast.error("Please enter a valid patient name");
      return;
    }

    if (
      !patientAge ||
      isNaN(patientAge) ||
      patientAge <= 0 ||
      patientAge > 120
    ) {
      toast.error("Please enter a valid age (1 - 120)");
      return;
    }

    if (!patientLocation || patientLocation.trim().length < 2) {
      toast.error("Please enter your location");
      return;
    }
    if (
      !diseaseDuration ||
      isNaN(diseaseDuration) ||
      diseaseDuration <= 0 ||
      diseaseDuration > 365
    ) {
      toast.error("Please enter valid disease duration (1 - 365 days)");
      return;
    }
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      toast.info("Predicting disease...");
      const response = await axios.post(
        `${FLASK_API_URL}/api/predict`,
        {
          name: patientName,
          age: patientAge,
          location: patientLocation,
          duration: diseaseDuration,
          symptoms: selectedSymptoms.join(", "),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setResult(response.data);
      toast.success("Prediction successful!");
      setActiveTab("description");
    } catch (err) {
      toast.error(err.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      key: "description",
      label: "Description",
      icon: ClipboardCheck,
      color: "#3b82f6",
    },

    { key: "medications", label: "Medications", icon: Pill, color: "#a855f7" },

    {
      key: "precautions",
      label: "Precautions",
      icon: CircleAlert,
      color: "#f97316",
    },

    { key: "diet", label: "Diet", icon: UtensilsCrossed, color: "#ec4899" },

    { key: "workout", label: "Workout", icon: Dumbbell, color: "#14b8a6" },
  ];

  // Render tab content
  const renderTabContent = () => {
    if (!result) return null;

    const contents = {
      description: result.description || "No description available",
      medications: result.medications || [],
      precautions: result.precautions || [],
      diet: result.diet || [],
      workout: result.workout || [],
    };

    const content = contents[activeTab];

    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[150px]">
        {Array.isArray(content) ? (
          content.length > 0 ? (
            <ul className="space-y-2">
              {content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 md:text-base">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )
        ) : (
          <p>{content}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            🏥 Smart HealthCare & Medical Recommendation
          </h1>
          <p className="text-gray-600">
            Powered by AI - Machine Learning Model
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-xl shadow-lg border border-gray-200">
            <div className="bg-white rounded-xl p-6 shadow-inner border border-gray-100 overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 text-green-700">
                🧍 Patient Information
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <User className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="flex-1 p-3 outline-none rounded-r-lg "
                  />
                </div>
              </div>

              {/* Age & Duration */}
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Age
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Activity className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="number"
                      placeholder="Age"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="flex-1 p-3 outline-none rounded-r-lg "
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Duration (days)
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Clock className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="number"
                      placeholder="Days"
                      value={diseaseDuration}
                      onChange={(e) => setDiseaseDuration(e.target.value)}
                      className="flex-1 p-3 outline-none rounded-r-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <MapPin className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={patientLocation}
                    onChange={(e) => setPatientLocation(e.target.value)}
                    className="flex-1 p-3 outline-none rounded-r-lg"
                  />
                </div>
              </div>

              {/* Symptoms Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Search & Select Symptoms
                </label>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Search className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type to search (e.g., headache, fever, itching)"
                      value={searchInput}
                      onChange={(e) => handleSearchInput(e.target.value)}
                      onFocus={() => searchInput && setShowSuggestions(true)}
                      className="flex-1 p-3 outline-none"
                    />
                    <button
                      type="button"
                      onClick={startSpeechRecognition}
                      className={`p-3 transition-colors ${
                        isListening
                          ? "bg-red-500 text-white animate-pulse"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      title="Click to speak symptoms"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-60 overflow-y-auto">
                      {suggestions.map((symptom, i) => (
                        <div
                          key={i}
                          onClick={() => addSymptom(symptom)}
                          className="p-3 hover:bg-green-50 cursor-pointer border-b last:border-b-0"
                        >
                          <span className="font-medium text-gray-800">
                            {formatSymptom(symptom)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {speechStatus && (
                  <p className="text-sm mt-2 text-gray-600">{speechStatus}</p>
                )}

                {/* Selected Symptoms */}
                {selectedSymptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedSymptoms.map((name, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium 
              flex items-center gap-2 hover:bg-green-200"
                      >
                        {formatSymptom(name)}
                        <X
                          className="w-4 h-4 cursor-pointer hover:text-red-500"
                          onClick={() => removeSymptom(name)}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={
                  loading ||
                  selectedSymptoms.length === 0 ||
                  !patientName ||
                  !patientAge ||
                  !patientLocation ||
                  !diseaseDuration
                }
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
      text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    Predict Disease
                    <ArrowBigRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {result ? (
              <>
                {/* Patient & Disease Info */}
                <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                  <h2 className="text-lg font-semibold text-green-700 mb-2">
                    🏥 Prediction Results
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <p>
                      <strong>Patient:</strong> {patientName || "N/A"}
                    </p>
                    <p>
                      <strong>Age:</strong> {patientAge || "N/A"}
                    </p>
                  </div>
                  <p className="text-sm mt-1 mb-2">
                    <strong>Symptoms:</strong>{" "}
                    <span className="text-gray-700">
                      {selectedSymptoms.map(formatSymptom).join(", ")}
                    </span>
                  </p>
                  <div className="mt-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <p className="text-lg">
                      <strong>Predicted Disease:</strong>{" "}
                      <span className="text-red-600 font-bold">
                        {result.predicted_disease}
                      </span>
                    </p>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      ⚠️ <strong>Disclaimer:</strong> This is an AI prediction
                      for informational purposes only. Please consult a
                      qualified healthcare professional for accurate diagnosis
                      and treatment.
                    </p>
                  </div>
                </div>

                {/* Tab Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                  {tabs.map(({ key, label, icon: Icon, color }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`p-2 rounded-lg text-[10px] sm:text-xs font-medium flex flex-col 
                        items-center gap-1 
                        transition-all cursor-pointer ${
                          activeTab === key
                            ? `bg-${color}-500 text-white shadow-md`
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      style={
                        activeTab === key
                          ? {
                              backgroundColor: color,
                            }
                          : {}
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {renderTabContent()}

                {/* Print Button */}
                <button
                  onClick={handleGenerateReport}
                  className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 
                  rounded-lg transition-colors cursor-pointer"
                >
                  🖨️ Generate Medical Report
                </button>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                <ClipboardList className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-medium">No Results Yet</h3>
                <p className="text-sm text-center mt-2 px-4">
                  Enter your symptoms and click "Predict" to get health
                  recommendations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAI;
