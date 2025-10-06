import React, { useEffect, useState, type JSX } from "react";
import { getSectors, saveUser, updateUser, getUser } from "../api/api";
import type { Sector, UserDataDto } from "../types/types";

const SectorForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [sectorIds, setSectorIds] = useState<number[]>([]);
  const [agree, setAgree] = useState<boolean>(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
    document.documentElement.toggleAttribute("data-theme", isDark);

    const loadInitialData = async () => {
      try {
        const sectorsData = await getSectors();
        setSectors(sectorsData);

        const savedUserId = sessionStorage.getItem("userId");
        if (savedUserId) {
          const userIdNum = Number(savedUserId);
          setUserId(userIdNum);
          try {
            const userData = await getUser(userIdNum);
            setName(userData.name);
            setSectorIds(userData.sectorIds);
            setAgree(userData.agree);
          } catch (error) {
            console.error("Failed to load user data:", error);
            clearSession();
          }
        }
      } catch (error) {
        console.error("Failed to load sectors:", error);
        setMessage("Failed to load sectors. Please refresh the page.");
      }
    };

    loadInitialData();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim() || sectorIds.length === 0 || !agree) {
      setMessage("All fields are mandatory");
      setIsLoading(false);
      return;
    }

    const data: UserDataDto = { name: name.trim(), sectorIds, agree };

    try {
      let saved: UserDataDto;
      if (userId) {
        saved = await updateUser(userId, data);
      } else {
        saved = await saveUser(data);
        setUserId(saved.id!);
        sessionStorage.setItem("userId", saved.id!.toString());
      }

      setMessage(
        userId ? "Data updated successfully!" : "Data saved successfully!"
      );
      setName(saved.name);
      setSectorIds(saved.sectorIds);
      setAgree(saved.agree);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) =>
      parseInt(opt.value)
    );
    setSectorIds(selected);
  };

  const buildSectorOptions = (sectors: Sector[]) => {
    const options: JSX.Element[] = [];

    const addSector = (sector: Sector, depth: number = 0) => {
      const paddingLeft = `${depth * 20}px`;

      options.push(
        <option key={sector.id} value={sector.id} style={{ paddingLeft }}>
          {sector.name}
        </option>
      );

      sectors
        .filter((s) => s.parentId === sector.id)
        .forEach((child) => addSector(child, depth + 1));
    };

    sectors.filter((s) => !s.parentId).forEach((root) => addSector(root));

    return options;
  };

  const clearSession = () => {
    sessionStorage.removeItem("userId");
    setUserId(null);
    setName("");
    setSectorIds([]);
    setAgree(false);
    setMessage("Session cleared. You can start a new session.");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <div className="toggle-slider" />
        </button>

        <h2 className="form-title">
          {userId ? "Edit Your Information" : "User Information"}
        </h2>

        <label className="form-label">
          Name:
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </label>

        <label className="form-label">
          Sectors:
          <select
            multiple
            className="form-select"
            value={sectorIds.map(String)}
            onChange={handleSectorChange}
            required
            size={8}
            disabled={isLoading}
          >
            {buildSectorOptions(sectors)}
          </select>
        </label>

        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
            disabled={isLoading}
          />
          I agree to the terms
        </label>

        <div
          style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        >
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Processing..." : userId ? "Update" : "Save"}
          </button>

          {userId && (
            <button
              type="button"
              onClick={clearSession}
              className="session-button"
              disabled={isLoading}
            >
              Start New Session
            </button>
          )}
        </div>

        {message && (
          <p
            className={`form-message ${
              message.includes("successfully") || message.includes("cleared")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SectorForm;
