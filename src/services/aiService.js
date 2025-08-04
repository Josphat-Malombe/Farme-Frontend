import api from "./api";

export async function sendMessage(sessionId,question){
    console.log("payload to API", {session_id: sessionId,question})
    const token = localStorage.getItem('access'); // Adjust based on where your token is stored
    if (!token) {
        throw new Error('No authentication token found');
  }
    console.log("token to be send:",token)

    return api.post('/chat/respond/',{
        session_id: sessionId,
        question: question,
    }
);
}

export async function createSession() {
    return api.post('/sessions/')
    
}


export async function getHistory(sessionId){
    return api.get(`/sessions/${sessionId}/messages/`)
}


export async function sendVoiceMessage(sessionId, audioBlob) {

  console.log("Payload for voice API:", { session_id: sessionId });
    

  
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const formData = new FormData();
  
  if(sessionId){
    formData.append("session_id",sessionId)
  }
  formData.append("audio", audioBlob, "voice.webm");
  formData.append("exclude_from_history", true)

  return api.post("/voice/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  });
}  