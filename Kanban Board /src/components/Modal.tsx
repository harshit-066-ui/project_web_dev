import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Card, Priority } from "./types";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, priority?: Priority) => void;
  initialData?: Card;
}

function CardModal({ isOpen, onClose, onSave, initialData }: CardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setDescription(initialData?.description ?? "");
    setPriority(initialData?.priority ?? "");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div style={overlay}>
      <div style={modal}>
        <h3>{initialData ? "Edit Card" : "Add Card"}</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={field} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={field} />
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} style={field}>
          <option value="">No Priority</option>
          <option value="red">Urgent</option>
          <option value="orange">Essential</option>
          <option value="yellow">Optional</option>
        </select>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              if (title.trim() && description.trim()) {
                onSave(title, description, priority || undefined);
                onClose();
              }
            }}
          >
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "#fff",
  padding: "16px",
  borderRadius: "8px",
  width: "320px",
};

const field = {
  width: "100%",
  marginBottom: "8px",
};

export default CardModal;
