"use client";

import React, { createContext, useReducer, Dispatch } from "react";

type ActionType = "ADD_FILE" | "DELETE_FILE" | "SET_FILES";

interface Action {
    type: ActionType;
    payload?: any;
}

interface State {
    files: File[];
    remainingSpace: number;
}

const initialState: State = {
    files: [],
    remainingSpace: 1024,
};

const FileUploadContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

const fileUploadReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_FILES":
            if (!Array.isArray(action.payload)) {
                console.error("Payload for SET_FILES must be an array");
                return state;
            }
            const totalUploadedSizeMB = action.payload.reduce(
                (acc: number, file: File) => acc + file.size / 1024 / 1024,
                0
            );
            return { ...state, files: action.payload, remainingSpace: 1024 - totalUploadedSizeMB };
        case "ADD_FILE":
            const newFiles = [...state.files, action.payload];
            const newRemainingSpace = state.remainingSpace - action.payload.size / 1024 / 1024;
            return { ...state, files: newFiles, remainingSpace: newRemainingSpace };
        case "DELETE_FILE":
            const filteredFiles = state.files.filter((_, index) => index !== action.payload);
            const deletedFileSize = state.files[action.payload].size / 1024 / 1024;
            return { ...state, files: filteredFiles, remainingSpace: state.remainingSpace + deletedFileSize };
        default:
            return state;
    }
}

const FileUploadProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(fileUploadReducer, initialState);

    return (
        <FileUploadContext.Provider value={{ state, dispatch }}>
            {children}
        </FileUploadContext.Provider>
    );
};

export { FileUploadProvider, FileUploadContext };