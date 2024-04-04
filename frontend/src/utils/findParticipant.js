export function findParticipant(object, participantId) {
  const participants = object.participants;
  return participants.findIndex(
    (participant) => participant._id === participantId
  );
}

export const example = {
  lastMessage: {
    text: " adsa dasdad",
    sender: "65fc58ab272590a94246743c",
  },
  _id: "6606a5f28507fdfa3f27758d",
  participants: [
    {
      _id: "660e5c0d87fd91681604bf67",
      fullName: "test",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=test",
    },
    {
      _id: "65fc58cd272590a942467443",
      fullName: "chatter",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=chatter",
    },
  ],
  createdAt: "2024-03-29T11:28:50.608Z",
  updatedAt: "2024-04-03T13:54:45.156Z",
  __v: 184,
};
export function checkBothParticipant(participants, participantId) {
  return participants.some((participant) => participant._id === participantId);
}
