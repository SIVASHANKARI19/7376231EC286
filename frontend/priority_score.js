import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function fetchNotifications() {

    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.notifications;

    } catch (error) {

        console.log("Error fetching notifications");

        console.log(
            error.response?.data || error.message
        );

        return [];
    }
}

function calculatePriority(type, timestamp) {

    const weights = {
        placement: 3,
        result: 2,
        event: 1
    };

    const notificationTime =
        new Date(
            timestamp.replace(" ", "T")
        ).getTime();

    const ageInHours =
        (Date.now() - notificationTime) /
        (1000 * 60 * 60);
    return (
        (weights[type.toLowerCase()] || 0) * 100
    ) - ageInHours;
}

async function main() {

    const notifications =
        await fetchNotifications();

    const rankedNotifications =
        notifications.map((item) => {
            return {
                id: item.ID,
                type: item.Type,
                title: item.Message,
                timestamp: item.Timestamp,
                priority: calculatePriority(
                    item.Type,
                    item.Timestamp
                )
            };
        });

    rankedNotifications.sort(
        (a, b) => b.priority - a.priority
    );

    const topNotifications =
        rankedNotifications.slice(0, 10);

    console.log(
        "\n========== TOP PRIORITY NOTIFICATIONS ==========\n"
    );
    topNotifications.forEach(
        (item, index) => {
            console.log(
                `Rank : ${index + 1}`
            );
            console.log(
                `ID   : ${item.id}`
            );

            console.log(
                `Type : ${item.type}`
            );

            console.log(
                `Title: ${item.title}`
            );

            console.log(
                `Score: ${item.priority.toFixed(2)}`
            );

            console.log(
                "-------------------------------------"
            );
        }
    );
}

main();