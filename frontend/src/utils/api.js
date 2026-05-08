import axios from "axios";
console.log(import.meta.env.TOKEN);
const API_URL =
    "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications(
    limit = 10,
    page = 1,
    type = ""
) {

    try {

        const response = await axios.get(
            API_URL,
            {
                params: {
                    limit,
                    page,
                    notification_type: type
                },

                headers: {
                    Authorization:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhc2hhbmthcmkuZWMyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzNjc0MCwiaWF0IjoxNzc4MjM1ODQwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNmE0N2Q4ZjMtMTQxZS00ZjdjLWJhMjUtMDY3OTIzOWQxZDhiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2l2YXNoYW5rYXJpIHIiLCJzdWIiOiJjZTA4ZjI4OC1kMDgxLTRhYWQtOTc2Ny0zMDVkYTVmOTU2ZDgifSwiZW1haWwiOiJzaXZhc2hhbmthcmkuZWMyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJzaXZhc2hhbmthcmkgciIsInJvbGxObyI6IjczNzYyMzFlYzI4NiIsImFjY2Vzc0NvZGUiOiJ1S2FKZm0iLCJjbGllbnRJRCI6ImNlMDhmMjg4LWQwODEtNGFhZC05NzY3LTMwNWRhNWY5NTZkOCIsImNsaWVudFNlY3JldCI6InJhZURubWp6YUNqcXFEcEsifQ.eodPkpjAbCPqQfexOlhQRTOPdQF7Xa14TWawg-nBQN8`,
                    "Content-Type":
                        "application/json"
                }
            }
        );

        console.log(
            response.data.notifications
        );

        return response.data.notifications;

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        return [];
    }
}