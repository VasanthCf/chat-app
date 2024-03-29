import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),
  reply: "",
  setReply: (reply) => set({ reply }),
  inputMessage: "",
  setInputMessage: (inputMessage) => set({ inputMessage }),
  optionBlur: null,
  setOptionBlur: (optionBlur) => set({ optionBlur }),
}));

export default useConversation;
