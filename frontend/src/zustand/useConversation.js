import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  isTyping: "",
  setIsTyping: (isTyping) => set({ isTyping }),
  reply: {
    replyingMsg: "",
    senderId: "",
  },
  setReply: (reply) => set({ reply }),
  inputMessage: "",
  setInputMessage: (inputMessage) => set({ inputMessage }),
  optionBlur: null,
  setOptionBlur: (optionBlur) => set({ optionBlur }),
  globalLoading: false,
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
  selectedReceiver: null,
  setSelectedReceiver: (selectedReceiver) => set({ selectedReceiver }),
  allConversation: null,
  setAllConversation: (allConversation) => set({ allConversation }),
}));

export default useConversation;
