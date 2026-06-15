import { useState } from "react";

export default function useBookFunction() {

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedSerial, setSelectedSerial] = useState("");
    const [showIssueModal, setShowIssueModal] = useState(false);

    return {
        setSelectedBookId, setSelectedSerial, setShowIssueModal
    }
}